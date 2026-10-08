import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TranslatePipe } from '@ngx-translate/core';
import { SystemProgress, SystemsList } from '../systems-list/systems-list';

export interface SystemsSheetData {
  systems: SystemProgress[];
  current: number;
}

@Component({
  selector: 'app-systems-sheet',
  imports: [SystemsList, TranslatePipe],
  template: `
    <h2 class="title">{{ 'inspection.checklist.systems' | translate }}</h2>
    <app-systems-list
      [systems]="data.systems"
      [current]="data.current"
      (selected)="reference.dismiss($event)"
    />
  `,
  styles: `
    .title {
      margin: 8px 8px 12px;
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class SystemsSheet {
  protected readonly data = inject<SystemsSheetData>(MAT_BOTTOM_SHEET_DATA);
  protected readonly reference = inject<MatBottomSheetRef<SystemsSheet, number>>(MatBottomSheetRef);
}
