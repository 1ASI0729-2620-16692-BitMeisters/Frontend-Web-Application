import { HttpResponse, http } from 'msw';
import {
  InspectionResource,
  InspectionResultResource,
} from '../../app/inspection/infrastructure/resources/inspection.resource';
import { database } from '../database';
import { problem, unauthorized } from '../problem';

const api = '/api/v1';

function findInspection(id: unknown) {
  return database.inspections.find((inspection) => inspection.id === id);
}

function inspectionNotFound(request: Request) {
  return problem(request, 404, 'Not Found', {
    en: 'The inspection was not found.',
    es: 'No se encontró la inspección.',
  });
}

function inspectionClosed(request: Request) {
  return problem(request, 409, 'Conflict', {
    en: 'The inspection is no longer in progress.',
    es: 'La inspección ya no está en curso.',
  });
}

const results = ['OK', 'OBSERVED', 'FAIL'];

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

    const inspection = findInspection(params['id']);
    if (!inspection) return inspectionNotFound(request);
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

  http.post(`${api}/inspections/:id/results`, async ({ request, params }) => {
    const denied = unauthorized(request);
    if (denied) return denied;

    const inspection = findInspection(params['id']);
    if (!inspection) return inspectionNotFound(request);
    if (inspection.status !== 'IN_PROGRESS') return inspectionClosed(request);

    const body = (await request.json()) as { inspectionItemId?: string; result?: string };
    const item = database.inspectionItems.find(
      (candidate) => candidate.id === body.inspectionItemId,
    );
    if (!item || !body.result || !results.includes(body.result)) {
      return problem(
        request,
        400,
        'Bad Request',
        {
          en: 'The request contains invalid fields.',
          es: 'La solicitud contiene campos no válidos.',
        },
        [{ field: item ? 'result' : 'inspectionItemId', message: 'The value is not valid.' }],
      );
    }
    if (inspection.results.some((entry) => entry.inspectionItemId === item.id)) {
      return problem(request, 409, 'Conflict', {
        en: 'This item already has a result in the inspection.',
        es: 'Este elemento ya tiene un resultado en la inspección.',
      });
    }

    const entry: InspectionResultResource = {
      id: crypto.randomUUID(),
      inspectionItemId: item.id,
      itemName: item.name,
      itemCategory: item.category,
      result: body.result,
      createdAt: new Date().toISOString(),
      observations: [],
    };
    inspection.results.push(entry);
    inspection.updatedAt = entry.createdAt;

    return HttpResponse.json(entry, {
      status: 201,
      headers: { Location: `${api}/inspections/${inspection.id}/results/${entry.id}` },
    });
  }),

  http.patch(`${api}/inspections/:id/results/:resultId`, async ({ request, params }) => {
    const denied = unauthorized(request);
    if (denied) return denied;

    const inspection = findInspection(params['id']);
    if (!inspection) return inspectionNotFound(request);
    if (inspection.status !== 'IN_PROGRESS') return inspectionClosed(request);

    const entry = inspection.results.find((candidate) => candidate.id === params['resultId']);
    if (!entry) {
      return problem(request, 404, 'Not Found', {
        en: 'The result was not found.',
        es: 'No se encontró el resultado.',
      });
    }

    const body = (await request.json()) as { result?: string };
    if (!body.result || !results.includes(body.result)) {
      return problem(
        request,
        400,
        'Bad Request',
        {
          en: 'The request contains invalid fields.',
          es: 'La solicitud contiene campos no válidos.',
        },
        [{ field: 'result', message: 'The value is not valid.' }],
      );
    }

    entry.result = body.result;
    inspection.updatedAt = new Date().toISOString();
    return HttpResponse.json(entry);
  }),
];
