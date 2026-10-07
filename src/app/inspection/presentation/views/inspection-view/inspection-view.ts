import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { InspectionStore } from '../../../application/inspection.store';
import { InspectionItem } from '../../../domain/model/inspection-item.entity';
import { Inspection } from '../../../domain/model/inspection.entity';
import { InspectionResultEntry } from '../../../domain/model/inspection-result.entity';
import { Observation } from '../../../domain/model/observation.entity';
import { Evidence } from '../../../domain/model/evidence.entity';
import { ItemCategory, ResultValue } from '../../../domain/model/inspection.types';
import { ObservationDialog, ObservationDialogData } from '../../components/observation-dialog/observation-dialog';
import { InspectionDetailDialog } from '../../components/inspection-detail-dialog/inspection-detail-dialog';

type DriverStep = 'ASSIGNED_VEHICLE' | 'CHECKLIST' | 'SUMMARY' | 'RESULT';

@Component({
  selector: 'app-inspection-view',
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
    DatePipe,
    LowerCasePipe,
  ],
  templateUrl: './inspection-view.html',
  styleUrl: './inspection-view.css',
})
export class InspectionView {
  protected readonly store = inject(InspectionStore);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);

  readonly activeInspection = this.store.activeInspection;
  readonly driverStep = signal<DriverStep>('ASSIGNED_VEHICLE');
  readonly selectedTabIndex = signal(0);

  // Driver assigned vehicle mock data
  readonly assignedVehicle = {
    id: 'veh-abc-123',
    plate: 'ABC-123',
    model: 'Volvo FH 460 · Tractor unit',
    assignedSince: '01/09/2026',
    odometer: 184320,
    driverId: 'drv-juan-santos',
    driverName: 'Juan Santos',
  };

  // Local answers map during checklist execution: itemId -> InspectionResultEntry
  readonly resultsMap = signal<Map<string, InspectionResultEntry>>(new Map());

  // Supervisor history filters
  filterVehicle = '';
  filterResult = 'ALL';

  readonly historyColumns: string[] = [
    'date',
    'vehicle',
    'driver',
    'result',
    'exception',
    'authorizedBy',
    'actions',
  ];

  // Categories helper
  readonly categories: ItemCategory[] = ['SAFETY_COMPONENT', 'COMPONENT', 'DOCUMENTATION'];

  // Computed metrics
  readonly answeredCount = computed(() => this.resultsMap().size);
  readonly totalItemsCount = computed(() => this.store.items().length);
  readonly progressPercentage = computed(() => {
    const total = this.totalItemsCount();
    return total > 0 ? (this.answeredCount() / total) * 100 : 0;
  });

  readonly compliantCount = computed(() => {
    let count = 0;
    this.resultsMap().forEach((val) => {
      if (val.result === 'OK') count++;
    });
    return count;
  });

  readonly observedCount = computed(() => {
    let count = 0;
    this.resultsMap().forEach((val) => {
      if (val.result === 'OBSERVED') count++;
    });
    return count;
  });

  readonly failedCount = computed(() => {
    let count = 0;
    this.resultsMap().forEach((val) => {
      if (val.result === 'FAIL') count++;
    });
    return count;
  });

  readonly findingsList = computed(() => {
    const list: InspectionResultEntry[] = [];
    this.resultsMap().forEach((val) => {
      if (val.result !== 'OK') list.push(val);
    });
    return list;
  });

  readonly filteredInspections = computed(() => {
    return this.store.inspections().filter((insp: Inspection) => {
      const matchVeh = this.filterVehicle
        ? insp.vehiclePlate.toLowerCase().includes(this.filterVehicle.toLowerCase())
        : true;
      const matchRes =
        this.filterResult !== 'ALL' ? insp.operatingCondition === this.filterResult : true;
      return matchVeh && matchRes;
    });
  });

  getItemsByCategory(category: ItemCategory): InspectionItem[] {
    return this.store.items().filter((it: InspectionItem) => it.category === category);
  }

  getItemResult(itemId: string): ResultValue | null {
    return this.resultsMap().get(itemId)?.result ?? null;
  }

  getItemResultEntry(itemId: string): InspectionResultEntry | undefined {
    return this.resultsMap().get(itemId);
  }

  // --- Driver Workflow Actions ---

  startInspection(): void {
    this.store.startInspection(
      this.assignedVehicle.id,
      this.assignedVehicle.plate,
      this.assignedVehicle.driverId,
      this.assignedVehicle.driverName,
      this.assignedVehicle.odometer,
    );
    this.resultsMap.set(new Map());
    this.driverStep.set('CHECKLIST');
  }

  setResult(item: InspectionItem, value: ResultValue): void {
    const current = this.resultsMap().get(item.id);
    const active = this.store.activeInspection();
    if (!active) return;

    if (value === 'OK') {
      const entry = new InspectionResultEntry({
        id: current?.id || crypto.randomUUID(),
        itemId: item.id,
        itemName: item.name,
        itemCategory: item.category,
        isCriticalSafety: item.isCriticalSafety,
        result: 'OK',
      });
      this.resultsMap.update((map) => {
        map.set(item.id, entry);
        return new Map(map);
      });
      this.store.recordResult(item, 'OK');
    } else {
      this.openObservationDialog(item, value);
    }
  }

  openObservationDialog(item: InspectionItem, value: ResultValue): void {
    const current = this.resultsMap().get(item.id);
    const existingObs = current?.observation;

    const dialogData: ObservationDialogData = {
      itemName: item.name,
      result: value,
      requiresEvidence: item.requiresPhotoOnFail,
      description: existingObs?.notes || '',
      evidences: existingObs?.evidence?.photoUrl ? [existingObs.evidence.photoUrl] : [],
    };

    const dialogRef = this.dialog.open(ObservationDialog, {
      width: '420px',
      data: dialogData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((resData) => {
      if (resData) {
        let evidence: Evidence | undefined;
        if (resData.evidences && resData.evidences.length > 0) {
          evidence = new Evidence({
            id: crypto.randomUUID(),
            photoUrl: resData.evidences[0],
            capturedAt: new Date().toISOString(),
          });
        }

        const observation = new Observation({
          id: existingObs?.id || crypto.randomUUID(),
          notes: resData.description,
          evidence,
        });

        const entry = new InspectionResultEntry({
          id: current?.id || crypto.randomUUID(),
          itemId: item.id,
          itemName: item.name,
          itemCategory: item.category,
          isCriticalSafety: item.isCriticalSafety,
          result: value,
          observation,
        });

        this.resultsMap.update((map) => {
          map.set(item.id, entry);
          return new Map(map);
        });

        this.store.recordResult(item, value, observation);
      }
    });
  }

  goToSummary(): void {
    const remaining = this.totalItemsCount() - this.answeredCount();
    if (remaining > 0) {
      this.snackBar.open(
        this.translate.instant('inspection.checklist.pendingAlert', { count: remaining }),
        this.translate.instant('shared.close') || 'OK',
        { duration: 4000 },
      );
      return;
    }
    this.driverStep.set('SUMMARY');
  }

  backToChecklist(): void {
    this.driverStep.set('CHECKLIST');
  }

  submitInspection(): void {
    const active = this.store.activeInspection();
    if (!active) return;

    this.resultsMap().forEach((entry) => {
      active.addResult(entry);
    });

    this.store.submitInspection().subscribe({
      next: () => {
        this.driverStep.set('RESULT');
      },
      error: () => {
        // Fallback for simulation if mock server is down
        const { condition, failureReason } = this.store.evaluateCondition(active);
        active.complete(condition, failureReason);
        this.driverStep.set('RESULT');
      },
    });
  }

  finishFlow(): void {
    this.resultsMap.set(new Map());
    this.driverStep.set('ASSIGNED_VEHICLE');
  }

  // --- Supervisor Actions ---

  viewInspectionDetail(inspection: Inspection): void {
    this.dialog.open(InspectionDetailDialog, {
      width: '780px',
      data: inspection,
    });
  }

  exportPdf(): void {
    this.snackBar.open(
      this.translate.instant('inspection.history.pdfExported'),
      'OK',
      { duration: 3000 },
    );
  }
}
