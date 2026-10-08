import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { Notifier } from '../../shared/application/notifier';
import { ApiError } from '../../shared/infrastructure/http/api-error';
import { Inspection } from '../domain/model/aggregates/inspection.entity';
import { InspectionResultEntry } from '../domain/model/entities/inspection-result-entry.entity';
import { ItemCategory } from '../domain/model/valueobjects/item-category.enum';
import { ResultValue } from '../domain/model/valueobjects/result-value.enum';
import { StartInspectionCommand } from '../domain/model/commands/start-inspection.command';
import { AssignedVehicle } from '../domain/model/valueobjects/assigned-vehicle';
import { InspectionStatus } from '../domain/model/valueobjects/inspection-status.enum';
import { InspectionApi } from '../infrastructure/inspection-api';
import { InspectionStore } from './inspection.store';

const assignedVehicle = new AssignedVehicle({
  vehicleId: 'vehicle-1',
  plate: 'ABC-123',
  brand: 'Volvo',
  model: 'FH 460',
  type: 'Tractor unit',
  assignedFrom: new Date('2026-09-01'),
});

const startedInspection = new Inspection({
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

describe('InspectionStore', () => {
  const api = {
    getAssignedVehicle: vi.fn(),
    getActiveInspectionItems: vi.fn(),
    getInspection: vi.fn(),
    startInspection: vi.fn(),
    registerResult: vi.fn(),
    updateResult: vi.fn(),
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
    api.getAssignedVehicle.mockReturnValue(of(assignedVehicle));
    api.getActiveInspectionItems.mockReturnValue(of([]));
  });

  function entry(result: ResultValue): InspectionResultEntry {
    return new InspectionResultEntry({
      id: 'result-1',
      inspectionItemId: 'brakes',
      itemName: 'Brake system',
      itemCategory: ItemCategory.SAFETY_COMPONENT,
      result,
      createdAt: new Date('2026-09-15T10:39:00Z'),
      observations: [],
    });
  }

  it('registers the first result of an item and keeps it in the inspection', () => {
    api.getInspection.mockReturnValue(of(startedInspection));
    api.registerResult.mockReturnValue(of(entry(ResultValue.FAIL)));
    const store = createStore();
    store.loadInspection('inspection-1').subscribe();

    store.answerItem('brakes', ResultValue.FAIL).subscribe();

    expect(api.registerResult).toHaveBeenCalledWith(
      expect.objectContaining({ inspectionItemId: 'brakes', result: ResultValue.FAIL }),
    );
    expect(store.currentInspection()?.resultFor('brakes')?.result).toBe(ResultValue.FAIL);
    expect(store.savingItemId()).toBeNull();
  });

  it('corrects an item that already has a different result', () => {
    api.getInspection.mockReturnValue(of(startedInspection.withResult(entry(ResultValue.OK))));
    api.updateResult.mockReturnValue(of(entry(ResultValue.FAIL)));
    const store = createStore();
    store.loadInspection('inspection-1').subscribe();

    store.answerItem('brakes', ResultValue.FAIL).subscribe();

    expect(api.updateResult).toHaveBeenCalledWith(
      expect.objectContaining({ resultId: 'result-1', result: ResultValue.FAIL }),
    );
    expect(api.registerResult).not.toHaveBeenCalled();
    expect(store.currentInspection()?.resultFor('brakes')?.result).toBe(ResultValue.FAIL);
  });

  it('does not call the api when the item already has that result', () => {
    api.getInspection.mockReturnValue(of(startedInspection.withResult(entry(ResultValue.OK))));
    const store = createStore();
    store.loadInspection('inspection-1').subscribe();

    store.answerItem('brakes', ResultValue.OK).subscribe();

    expect(api.registerResult).not.toHaveBeenCalled();
    expect(api.updateResult).not.toHaveBeenCalled();
  });

  it('loads the vehicle assigned to the driver', () => {
    const store = createStore();
    TestBed.tick();

    expect(store.assignedVehicle.value()).toBe(assignedVehicle);
  });

  it('exposes the not found error when the driver has no assigned vehicle', () => {
    api.getAssignedVehicle.mockReturnValue(
      throwError(() => new ApiError(404, 'Not Found', 'No vehicle assigned.')),
    );
    const store = createStore();
    TestBed.tick();

    expect((store.assignedVehicle.error() as ApiError).status).toBe(404);
  });

  it('keeps the started inspection and notifies the success', () => {
    const response = new Subject<Inspection>();
    api.startInspection.mockReturnValue(response);
    const store = createStore();

    store.startInspection(new StartInspectionCommand({ odometer: 184320 })).subscribe();
    expect(store.starting()).toBe(true);

    response.next(startedInspection);
    response.complete();

    expect(store.currentInspection()).toBe(startedInspection);
    expect(notifier.success).toHaveBeenCalledWith('inspection.notifications.started');
    expect(store.starting()).toBe(false);
  });

  it('does not mark the inspection as starting until the request is sent', () => {
    api.startInspection.mockReturnValue(of(startedInspection));
    const store = createStore();

    store.startInspection(new StartInspectionCommand({ odometer: 184320 }));

    expect(store.starting()).toBe(false);
    expect(store.currentInspection()).toBeNull();
  });

  it('keeps no inspection and does not notify when starting fails', () => {
    api.startInspection.mockReturnValue(
      throwError(() => new ApiError(409, 'Conflict', 'An inspection is already in progress.')),
    );
    const store = createStore();

    store
      .startInspection(new StartInspectionCommand({ odometer: 184320 }))
      .subscribe({ error: () => undefined });

    expect(store.currentInspection()).toBeNull();
    expect(notifier.success).not.toHaveBeenCalled();
    expect(store.starting()).toBe(false);
  });
});
