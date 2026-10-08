import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Notifier } from '../../shared/application/notifier';
import { AssignedVehicle } from '../domain/model/assigned-vehicle.entity';
import { InspectionItem } from '../domain/model/inspection-item.entity';
import { Inspection } from '../domain/model/inspection.entity';
import { InspectionStatus } from '../domain/model/inspection-status.enum';
import { ItemCategory } from '../domain/model/item-category.enum';
import { ItemSystem } from '../domain/model/item-system.enum';
import { ResultValue } from '../domain/model/result-value.enum';
import { InspectionApi } from '../infrastructure/inspection-api';
import { InspectionStore } from './inspection.store';

const vehicle = new AssignedVehicle({
  id: 'assignment-1',
  vehicleId: 'vehicle-1',
  driverId: 'driver-1',
  plate: 'ABC-123',
  brand: 'Volvo',
  model: 'FH 460',
  type: 'Tractor unit',
  assignedFrom: new Date('2026-09-01'),
});

const brakes = new InspectionItem({
  id: 'brakes',
  code: 'SAF-01',
  name: 'Brake system',
  description: '',
  category: ItemCategory.SAFETY_COMPONENT,
  system: ItemSystem.BRAKES,
  isSafetyComponent: true,
  requiresEvidence: true,
  displayOrder: 1,
  isActive: true,
  createdAt: new Date('2026-09-01T14:00:00Z'),
  updatedAt: new Date('2026-09-01T14:00:00Z'),
});

function anInspection(): Inspection {
  return new Inspection({
    id: 'inspection-1',
    vehicleId: 'vehicle-1',
    driverId: 'driver-1',
    status: InspectionStatus.IN_PROGRESS,
    odometer: 184320,
    startedAt: new Date('2026-09-15T10:38:00Z'),
    completedAt: null,
    results: [],
    createdAt: new Date('2026-09-15T10:38:00Z'),
    updatedAt: new Date('2026-09-15T10:38:00Z'),
  });
}

describe('InspectionStore', () => {
  const api = {
    getInspectionItems: vi.fn(),
    getAssignedVehicle: vi.fn(),
    getInspection: vi.fn(),
    createInspection: vi.fn(),
    updateInspection: vi.fn(),
  };
  const notifier = { success: vi.fn() };

  function createStore(): InspectionStore {
    TestBed.configureTestingModule({
      providers: [
        { provide: InspectionApi, useValue: api },
        { provide: Notifier, useValue: notifier },
      ],
    });
    return TestBed.inject(InspectionStore);
  }

  beforeEach(() => {
    vi.resetAllMocks();
    api.getInspectionItems.mockReturnValue(of([brakes]));
    api.getAssignedVehicle.mockReturnValue(of(vehicle));
  });

  it('loads the catalog and the assigned vehicle when it is created', () => {
    const store = createStore();

    expect(store.activeInspectionItems()).toEqual([brakes]);
    expect(store.assignedVehicle()).toBe(vehicle);
    expect(store.loading()).toBe(false);
  });

  it('marks that the driver has no vehicle when the assignment is not found', () => {
    api.getAssignedVehicle.mockReturnValue(
      throwError(() => new Error('Failed to fetch the assigned vehicle: Resource not found')),
    );
    const store = createStore();

    expect(store.noVehicleAssigned()).toBe(true);
    expect(store.error()).toBeNull();
  });

  it('keeps the started inspection and notifies the success', () => {
    const inspection = anInspection();
    api.createInspection.mockReturnValue(of(inspection));
    const store = createStore();

    store.startInspection(inspection);

    expect(store.currentInspection()).toBe(inspection);
    expect(notifier.success).toHaveBeenCalledWith('inspection.notifications.started');
  });

  it('forgets the inspection and keeps the error when starting fails', () => {
    api.createInspection.mockReturnValue(
      throwError(() => new Error('Failed to create entity: 500')),
    );
    const store = createStore();

    store.startInspection(anInspection());

    expect(store.currentInspection()).toBeNull();
    expect(store.error()).toBe('Failed to create entity: 500');
    expect(notifier.success).not.toHaveBeenCalled();
  });

  it('saves the answer of an item in the current inspection', () => {
    api.getInspection.mockReturnValue(of(anInspection()));
    api.updateInspection.mockImplementation((inspection: Inspection) => of(inspection));
    const store = createStore();
    store.loadInspection('inspection-1');

    store.answerItem(brakes, ResultValue.FAIL);

    const saved: Inspection = api.updateInspection.mock.calls[0][0];
    expect(saved.resultFor('brakes')?.result).toBe(ResultValue.FAIL);
    expect(store.currentInspection()?.resultFor('brakes')?.itemName).toBe('Brake system');
    expect(store.savingItemId()).toBeNull();
  });

  it('restores the previous answers when saving fails', () => {
    api.getInspection.mockReturnValue(of(anInspection()));
    api.updateInspection.mockReturnValue(throwError(() => new Error('Failed to update entity: 0')));
    const store = createStore();
    store.loadInspection('inspection-1');

    store.answerItem(brakes, ResultValue.OK);

    expect(store.currentInspection()?.resultFor('brakes')).toBeUndefined();
    expect(store.error()).toBe('Failed to update entity: 0');
  });

  it('does not save an item again with the same answer', () => {
    api.getInspection.mockReturnValue(of(anInspection()));
    api.updateInspection.mockImplementation((inspection: Inspection) => of(inspection));
    const store = createStore();
    store.loadInspection('inspection-1');

    store.answerItem(brakes, ResultValue.OK);
    store.answerItem(brakes, ResultValue.OK);

    expect(api.updateInspection).toHaveBeenCalledTimes(1);
  });
});
