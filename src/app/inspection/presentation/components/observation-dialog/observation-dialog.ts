import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ResultValue } from '../../../domain/model/inspection.types';

export interface ObservationDialogData {
  itemName: string;
  result: ResultValue;
  requiresEvidence: boolean;
  description: string;
  evidences: string[];
}

@Component({
  selector: 'app-observation-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './observation-dialog.html',
  styleUrl: './observation-dialog.css',
})
export class ObservationDialog {
  readonly dialogRef = inject(MatDialogRef<ObservationDialog>);
  readonly data = inject<ObservationDialogData>(MAT_DIALOG_DATA);

  description = this.data.description || '';
  evidences: string[] = [...(this.data.evidences || [])];

  addMockPhoto(): void {
    const photoNumber = this.evidences.length + 1;
    this.evidences.push(`photo ${photoNumber}`);
  }

  removePhoto(index: number): void {
    this.evidences.splice(index, 1);
  }

  canSave(): boolean {
    if (!this.description.trim()) {
      return false;
    }
    if (this.data.requiresEvidence && this.data.result === 'FAIL' && this.evidences.length === 0) {
      return false;
    }
    return true;
  }

  save(): void {
    if (!this.canSave()) return;
    this.dialogRef.close({
      description: this.description.trim(),
      evidences: this.evidences,
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
