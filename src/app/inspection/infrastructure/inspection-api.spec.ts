import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { InspectionItem } from '../domain/model/aggregates/inspection-item.entity';
import { Inspection } from '../domain/model/aggregates/inspection.entity';
import { StartInspectionCommand } from '../domain/model/commands/start-inspection.command';
import { AssignedVehicle } from '../domain/model/valueobjects/assigned-vehicle';
import { InspectionStatus } from '../domain/model/valueobjects/inspection-status.enum';
import { ItemCategory } from '../domain/model/valueobjects/item-category.enum';
import { ItemSystem } from '../domain/model/valueobjects/item-system.enum';
import { ResultValue } from '../domain/model/valueobjects/result-value.enum';
import { InspectionApi } from './inspection-api';
import { InspectionResource } from './resources/inspection.resource';

const baseUrl = environment.platformProviderApiBaseUrl;

const inspectionResource: InspectionResource = {
  id: 'inspection-1',
  vehicleId: 'vehicle-1',
  driverId: 'driver-1',
  status: 'IN_PROGRESS',
  odometer: 184320,
  startedAt: '2026-09-15T10:38:00Z',
  completedAt: null,
  results: [
    {
      id: 'result-1',
      inspectionItemId: 'item-1',
      itemName: 'Brake system',
      itemCategory: 'SAFETY_COMPONENT',
      result: 'FAIL',
      createdAt: '2026-09-15T10:39:00Z',
      observations: [
        {
          id: 'observation-1',
          description: 'The brake pedal sinks to the floor.',
          createdBy: 'driver-1',
          createdAt: '2026-09-15T10:40:00Z',
          evidences: [
            {
              id: 'evidence-1',
              fileUrl: 'https://storage.fleetsafe.pe/evidences/evidence-1.jpg',
              mediaType: 'image/jpeg',
              uploadedAt: '2026-09-15T10:41:00Z',
            },
          ],
        },
      ],
    },
  ],
  createdAt: '2026-09-15T10:38:00Z',
  updatedAt: '2026-09-15T10:41:00Z',
};

describe('InspectionApi', () => {
  let api: InspectionApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(InspectionApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('gets the vehicle assigned to the signed-in driver', () => {
    let vehicle: AssignedVehicle | undefined;
    api.getAssignedVehicle().subscribe((result) => (vehicle = result));

    http.expectOne(`${baseUrl}/drivers/me/vehicle-assignment`).flush({
      id: 'assignment-1',
      driverId: 'driver-1',
      assignedFrom: '2026-09-01',
      assignedTo: null,
      isActive: true,
      createdAt: '2026-09-01T14:00:00Z',
      vehicle: {
        id: 'vehicle-1',
        plate: 'ABC-123',
        brand: 'Volvo',
        model: 'FH 460',
        year: 2022,
        type: 'Tractor unit',
        currentStatus: 'ENABLED',
      },
    });

    expect(vehicle?.vehicleId).toBe('vehicle-1');
    expect(vehicle?.plate).toBe('ABC-123');
    expect(vehicle?.assignedFrom).toEqual(new Date('2026-09-01'));
  });

  it('gets the active inspection items', () => {
    let items: InspectionItem[] = [];
    api.getActiveInspectionItems().subscribe((result) => (items = result));

    http.expectOne(`${baseUrl}/inspection-items?isActive=true`).flush([
      {
        id: 'item-1',
        code: 'BRK-01',
        name: 'Brake system',
        category: 'SAFETY_COMPONENT',
        system: 'BRAKES',
        isSafetyComponent: true,
        requiresEvidence: true,
        displayOrder: 1,
        isActive: true,
        createdAt: '2026-09-01T14:00:00Z',
        updatedAt: '2026-09-01T14:00:00Z',
      },
    ]);

    expect(items).toHaveLength(1);
    expect(items[0].category).toBe(ItemCategory.SAFETY_COMPONENT);
    expect(items[0].system).toBe(ItemSystem.BRAKES);
    expect(items[0].description).toBe('');
    expect(items[0].createdAt).toEqual(new Date('2026-09-01T14:00:00Z'));
  });

  it('starts an inspection sending only the odometer', () => {
    let inspection: Inspection | undefined;
    api
      .startInspection(new StartInspectionCommand({ odometer: 184320 }))
      .subscribe((result) => (inspection = result));

    const request = http.expectOne(`${baseUrl}/inspections`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ odometer: 184320 });
    request.flush({ ...inspectionResource, results: [] });

    expect(inspection?.status).toBe(InspectionStatus.IN_PROGRESS);
    expect(inspection?.completedAt).toBeNull();
  });

  it('gets an inspection with its results, observations and evidences', () => {
    let inspection: Inspection | undefined;
    api.getInspection('inspection-1').subscribe((result) => (inspection = result));

    http.expectOne(`${baseUrl}/inspections/inspection-1`).flush(inspectionResource);

    const result = inspection?.results[0];
    expect(result?.result).toBe(ResultValue.FAIL);
    expect(result?.observations[0].evidences[0].mediaType).toBe('image/jpeg');
    expect(inspection?.startedAt).toEqual(new Date('2026-09-15T10:38:00Z'));
  });
});
