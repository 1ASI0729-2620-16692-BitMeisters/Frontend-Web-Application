import { HttpResponse, http } from 'msw';
import { InspectionResource } from '../../app/inspection/infrastructure/resources/inspection.resource';
import { database } from '../database';
import { problem, unauthorized } from '../problem';

const api = '/api/v1';

function activeAssignment() {
  return database.vehicleAssignments.find((assignment) => assignment.isActive);
}

export const inspectionHandlers = [
  http.get(`${api}/drivers/me/vehicle-assignment`, ({ request }) => {
    const denied = unauthorized(request);
    if (denied) return denied;

    const assignment = activeAssignment();
    if (!assignment) {
      return problem(request, 404, 'Not Found', {
        en: 'You have no vehicle assigned.',
        es: 'No tienes un vehículo asignado.',
      });
    }
    return HttpResponse.json(assignment);
  }),

  http.get(`${api}/inspection-items`, ({ request }) => {
    const denied = unauthorized(request);
    if (denied) return denied;

    const isActive = new URL(request.url).searchParams.get('isActive');
    const items = database.inspectionItems
      .filter((item) => isActive === null || String(item.isActive) === isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
    return HttpResponse.json(items);
  }),

  http.get(`${api}/inspections/:id`, ({ request, params }) => {
    const denied = unauthorized(request);
    if (denied) return denied;

    const inspection = database.inspections.find((candidate) => candidate.id === params['id']);
    if (!inspection) {
      return problem(request, 404, 'Not Found', {
        en: 'The inspection was not found.',
        es: 'No se encontró la inspección.',
      });
    }
    return HttpResponse.json(inspection);
  }),

  http.post(`${api}/inspections`, async ({ request }) => {
    const denied = unauthorized(request);
    if (denied) return denied;

    const { odometer } = (await request.json()) as { odometer?: unknown };
    if (typeof odometer !== 'number' || odometer < 0) {
      return problem(
        request,
        400,
        'Bad Request',
        {
          en: 'The request contains invalid fields.',
          es: 'La solicitud contiene campos no válidos.',
        },
        [{ field: 'odometer', message: 'The odometer reading must be zero or greater.' }],
      );
    }

    const assignment = activeAssignment();
    if (!assignment) {
      return problem(request, 409, 'Conflict', {
        en: 'You have no vehicle assigned, so you cannot start an inspection.',
        es: 'No tienes un vehículo asignado, así que no puedes iniciar una inspección.',
      });
    }

    const inProgress = database.inspections.some(
      (inspection) =>
        inspection.vehicleId === assignment.vehicle.id && inspection.status === 'IN_PROGRESS',
    );
    if (inProgress) {
      return problem(request, 409, 'Conflict', {
        en: 'This vehicle already has an inspection in progress.',
        es: 'Este vehículo ya tiene una inspección en curso.',
      });
    }

    const now = new Date().toISOString();
    const inspection: InspectionResource = {
      id: crypto.randomUUID(),
      vehicleId: assignment.vehicle.id,
      driverId: assignment.driverId,
      status: 'IN_PROGRESS',
      odometer,
      startedAt: now,
      completedAt: null,
      results: [],
      createdAt: now,
      updatedAt: now,
    };
    database.inspections.push(inspection);

    return HttpResponse.json(inspection, {
      status: 201,
      headers: { Location: `${api}/inspections/${inspection.id}` },
    });
  }),
];
