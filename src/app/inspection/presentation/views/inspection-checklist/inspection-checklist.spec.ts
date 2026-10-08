import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { InspectionStore } from '../../../application/inspection.store';
import { InspectionItem } from '../../../domain/model/inspection-item.entity';
import { Inspection } from '../../../domain/model/inspection.entity';
import { InspectionResultEntry } from '../../../domain/model/inspection-result-entry.entity';
import { InspectionStatus } from '../../../domain/model/inspection-status.enum';
import { ItemCategory } from '../../../domain/model/item-category.enum';
import { ItemSystem } from '../../../domain/model/item-system.enum';
import { ResultValue } from '../../../domain/model/result-value.enum';
import { InspectionChecklist } from './inspection-checklist';

function anItem(id: string, name: string, system: ItemSystem, displayOrder: number) {
  return new InspectionItem({
    id,
    code: id.toUpperCase(),
    name,
    description: '',
    category: ItemCategory.SAFETY_COMPONENT,
    system,
    isSafetyComponent: true,
    requiresEvidence: false,
    displayOrder,
    isActive: true,
    createdAt: new Date('2026-09-01T14:00:00Z'),
    updatedAt: new Date('2026-09-01T14:00:00Z'),
  });
}

const items = [
  anItem('brakes', 'Brake system', ItemSystem.BRAKES, 1),
  anItem('fluid', 'Brake fluid level', ItemSystem.BRAKES, 2),
  anItem('soat', 'SOAT certificate', ItemSystem.DOCUMENTATION, 3),
];

const inspection = new Inspection({
  id: 'inspection-1',
  vehicleId: 'vehicle-1',
  driverId: 'driver-1',
  status: InspectionStatus.IN_PROGRESS,
  odometer: 184320,
  startedAt: new Date('2026-09-15T10:38:00Z'),
  completedAt: null,
  results: [
    new InspectionResultEntry({
      id: 'result-1',
      inspectionItemId: 'brakes',
      itemName: 'Brake system',
      itemCategory: ItemCategory.SAFETY_COMPONENT,
      result: ResultValue.FAIL,
      createdAt: new Date('2026-09-15T10:39:00Z'),
      observations: [],
    }),
  ],
  createdAt: new Date('2026-09-15T10:38:00Z'),
  updatedAt: new Date('2026-09-15T10:39:00Z'),
});

function render() {
  const store = {
    assignedVehicle: signal(null),
    activeInspectionItems: signal(items),
    currentInspection: signal(inspection),
    savingItemId: signal(null),
    loading: signal(false),
    error: signal<string | null>(null),
    loadInspection: vi.fn(),
    loadInspectionItems: vi.fn(),
    answerItem: vi.fn(),
  };
  TestBed.configureTestingModule({
    imports: [InspectionChecklist],
    providers: [
      provideRouter([]),
      provideTranslateService(),
      { provide: InspectionStore, useValue: store },
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: convertToParamMap({ id: 'inspection-1' }) } },
      },
    ],
  });
  const fixture = TestBed.createComponent(InspectionChecklist);
  fixture.detectChanges();
  TestBed.tick();
  fixture.detectChanges();
  return { fixture, store };
}

describe('InspectionChecklist', () => {
  it('opens on the first system with pending items and shows only its items', () => {
    const { fixture, store } = render();
    const text: string = fixture.nativeElement.textContent;

    expect(text).toContain('inspection.system.BRAKES');
    expect(text).toContain('Brake system');
    expect(text).toContain('Brake fluid level');
    expect(text).not.toContain('SOAT certificate');
    expect(fixture.nativeElement.querySelectorAll('.segment')).toHaveLength(2);
    expect(store.loadInspection).not.toHaveBeenCalled();
  });

  it('asks for an observation on a failed item', () => {
    const { fixture } = render();
    const findings = fixture.nativeElement.querySelectorAll('.item-finding');

    expect(findings).toHaveLength(1);
    expect(findings[0].textContent).toContain('inspection.checklist.observationRequired');
  });

  it('keeps the next step locked until every item of the system is answered', () => {
    const { fixture } = render();
    const next: HTMLButtonElement = fixture.nativeElement.querySelectorAll('.actions button')[1];

    expect(next.disabled).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('inspection.checklist.answerAllToContinue');
  });

  it('answers an item with the selected result', () => {
    const { fixture, store } = render();
    const fluid: HTMLElement = fixture.nativeElement.querySelectorAll('.item')[1];

    fluid.querySelector<HTMLButtonElement>('[data-result="OK"]')?.click();

    expect(store.answerItem).toHaveBeenCalledWith(items[1], ResultValue.OK);
  });
});
