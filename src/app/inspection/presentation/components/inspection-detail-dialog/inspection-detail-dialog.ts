import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { Inspection } from '../../../domain/model/inspection.entity';

@Component({
  selector: 'app-inspection-detail-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    TranslatePipe,
    DatePipe,
    LowerCasePipe,
  ],
  templateUrl: './inspection-detail-dialog.html',
  styleUrl: './inspection-detail-dialog.css',
})
export class InspectionDetailDialog {
  readonly dialogRef = inject(MatDialogRef<InspectionDetailDialog>);
  readonly inspection = inject<Inspection>(MAT_DIALOG_DATA);

  displayedColumns: string[] = ['item', 'category', 'result', 'observation', 'evidence'];

  get nonCompliantResults() {
    return this.inspection.results.filter((r) => r.result !== 'OK');
  }

  get compliantCount() {
    return this.inspection.results.filter((r) => r.result === 'OK').length;
  }

  close(): void {
    this.dialogRef.close();
  }
}
