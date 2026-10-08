import { InspectionResultEntry } from '../entities/inspection-result-entry.entity';
import { InspectionStatus } from '../valueobjects/inspection-status.enum';
import { ItemCategory } from '../valueobjects/item-category.enum';
import { ResultValue } from '../valueobjects/result-value.enum';
import { Inspection } from './inspection.entity';

function anEntry(inspectionItemId: string, result: ResultValue): InspectionResultEntry {
  return new InspectionResultEntry({
    id: `result-${inspectionItemId}-${result}`,
    inspectionItemId,
    itemName: 'Brake system',
    itemCategory: ItemCategory.SAFETY_COMPONENT,
    result,
    createdAt: new Date('2026-09-15T10:39:00Z'),
    observations: [],
  });
}

function anInspection(results: InspectionResultEntry[]): Inspection {
  return new Inspection({
    id: 'inspection-1',
    vehicleId: 'vehicle-1',
    driverId: 'driver-1',
    status: InspectionStatus.IN_PROGRESS,
    odometer: 184320,
    startedAt: new Date('2026-09-15T10:38:00Z'),
    completedAt: null,
    results,
    createdAt: new Date('2026-09-15T10:38:00Z'),
    updatedAt: new Date('2026-09-15T10:38:00Z'),
  });
}

describe('Inspection', () => {
  it('finds the result registered for an item', () => {
    const brakes = anEntry('brakes', ResultValue.FAIL);
    const inspection = anInspection([brakes]);

    expect(inspection.resultFor('brakes')).toBe(brakes);
    expect(inspection.resultFor('lights')).toBeUndefined();
  });

  it('adds a result without changing the original inspection', () => {
    const original = anInspection([]);
    const brakes = anEntry('brakes', ResultValue.OK);

    const updated = original.withResult(brakes);

    expect(updated.results).toEqual([brakes]);
    expect(original.results).toEqual([]);
    expect(updated.equals(original)).toBe(true);
  });

  it('replaces the result of an item that was already answered', () => {
    const inspection = anInspection([anEntry('brakes', ResultValue.OK)]);
    const corrected = anEntry('brakes', ResultValue.FAIL);

    const updated = inspection.withResult(corrected);

    expect(updated.results).toEqual([corrected]);
  });
});
