import { Evidence } from '../entities/evidence.entity';
import { Inspection } from './inspection.entity';
import { InspectionItem } from './inspection-item.entity';
import { InspectionResultEntry } from '../entities/inspection-result-entry.entity';
import { InspectionStatus } from '../valueobjects/inspection-status.enum';
import { ItemCategory } from '../valueobjects/item-category.enum';
import { Observation } from '../entities/observation.entity';
import { ResultValue } from '../valueobjects/result-value.enum';

function anItem(id: string, overrides: { requiresEvidence?: boolean; isActive?: boolean } = {}) {
  return new InspectionItem({
    id,
    code: id.toUpperCase(),
    name: `Item ${id}`,
    description: '',
    category: ItemCategory.SAFETY_COMPONENT,
    isSafetyComponent: true,
    requiresEvidence: overrides.requiresEvidence ?? false,
    displayOrder: 1,
    isActive: overrides.isActive ?? true,
  });
}

function anObservation(withEvidence = false) {
  return new Observation({
    id: 'observation',
    description: 'Brake pedal sinks to the floor.',
    createdBy: 'driver',
    createdAt: new Date('2026-09-15T10:40:00Z'),
    evidences: withEvidence
      ? [
          new Evidence({
            id: 'evidence',
            fileUrl: 'https://storage.fleetsafe.pe/evidences/evidence.jpg',
            mediaType: 'image/jpeg',
            uploadedAt: new Date('2026-09-15T10:41:00Z'),
          }),
        ]
      : [],
  });
}

function aResult(item: InspectionItem, result: ResultValue, observations: Observation[] = []) {
  return new InspectionResultEntry({
    id: `result-${item.id}`,
    inspectionItemId: item.id,
    itemName: item.name,
    itemCategory: item.category,
    result,
    createdAt: new Date('2026-09-15T10:39:00Z'),
    observations,
  });
}

function anInspection(
  results: InspectionResultEntry[],
  status: InspectionStatus = InspectionStatus.IN_PROGRESS,
) {
  return new Inspection({
    id: 'inspection',
    vehicleId: 'vehicle',
    driverId: 'driver',
    status,
    odometer: 184320,
    startedAt: new Date('2026-09-15T10:38:00Z'),
    completedAt: null,
    results,
  });
}

describe('Inspection', () => {
  const brakes = anItem('brakes');
  const lights = anItem('lights');

  it('can be completed when every active item is OK', () => {
    const inspection = anInspection([
      aResult(brakes, ResultValue.OK),
      aResult(lights, ResultValue.OK),
    ]);

    expect(inspection.pendingItems([brakes, lights])).toEqual([]);
    expect(inspection.canComplete([brakes, lights])).toBe(true);
  });

  it('keeps an item without result pending', () => {
    const inspection = anInspection([aResult(brakes, ResultValue.OK)]);

    expect(inspection.pendingItems([brakes, lights])).toEqual([lights]);
    expect(inspection.canComplete([brakes, lights])).toBe(false);
  });

  it('keeps a failed item without observation pending', () => {
    const inspection = anInspection([aResult(brakes, ResultValue.FAIL)]);

    expect(inspection.pendingItems([brakes])).toEqual([brakes]);
  });

  it('resolves an observed item with an observation when it does not require evidence', () => {
    const inspection = anInspection([aResult(brakes, ResultValue.OBSERVED, [anObservation()])]);

    expect(inspection.pendingItems([brakes])).toEqual([]);
  });

  it('keeps a failed item pending until it has evidence when the item requires it', () => {
    const tires = anItem('tires', { requiresEvidence: true });

    const withoutEvidence = anInspection([aResult(tires, ResultValue.FAIL, [anObservation()])]);
    const withEvidence = anInspection([aResult(tires, ResultValue.FAIL, [anObservation(true)])]);

    expect(withoutEvidence.pendingItems([tires])).toEqual([tires]);
    expect(withEvidence.pendingItems([tires])).toEqual([]);
  });

  it('does not ask for evidence when an item that requires it is OK', () => {
    const tires = anItem('tires', { requiresEvidence: true });
    const inspection = anInspection([aResult(tires, ResultValue.OK)]);

    expect(inspection.pendingItems([tires])).toEqual([]);
  });

  it('ignores inactive items of the catalog', () => {
    const retired = anItem('retired', { isActive: false });
    const inspection = anInspection([aResult(brakes, ResultValue.OK)]);

    expect(inspection.pendingItems([brakes, retired])).toEqual([]);
  });

  it('cannot be completed once it is completed', () => {
    const inspection = anInspection([aResult(brakes, ResultValue.OK)], InspectionStatus.COMPLETED);

    expect(inspection.canComplete([brakes])).toBe(false);
  });

  it('lists observed and failed results as findings', () => {
    const observed = aResult(brakes, ResultValue.OBSERVED, [anObservation()]);
    const failed = aResult(lights, ResultValue.FAIL, [anObservation()]);
    const inspection = anInspection([observed, failed, aResult(anItem('horn'), ResultValue.OK)]);

    expect(inspection.findings()).toEqual([observed, failed]);
  });
});
