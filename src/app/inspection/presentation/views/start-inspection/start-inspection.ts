import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormField, form, min, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrentUser } from '../../../../shared/application/current-user';
import { ApiError } from '../../../../shared/infrastructure/http/api-error';
import { InspectionStore } from '../../../application/inspection.store';
import { StartInspectionCommand } from '../../../domain/model/commands/start-inspection.command';

@Component({
  selector: 'app-start-inspection',
  imports: [
    DatePipe,
    FormField,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  templateUrl: './start-inspection.html',
  styleUrl: './start-inspection.css',
})
export class StartInspection {
  protected readonly store = inject(InspectionStore);
  private readonly router = inject(Router);
  protected readonly currentUser = inject(CurrentUser);

  protected readonly startModel = signal({ odometer: NaN });
  protected readonly startForm = form(this.startModel, (path) => {
    required(path.odometer);
    min(path.odometer, 0);
  });

  protected readonly startError = signal<string | null>(null);

  protected readonly noVehicleAssigned = computed(
    () => (this.store.assignedVehicle.error() as ApiError | undefined)?.status === 404,
  );

  protected start(event: Event): void {
    event.preventDefault();
    if (this.startForm().invalid()) {
      this.startForm().markAsTouched();
      return;
    }

    this.startError.set(null);
    const command = new StartInspectionCommand({ odometer: this.startModel().odometer });
    this.store.startInspection(command).subscribe({
      next: (inspection) => this.router.navigate(['/inspections', inspection.id, 'execute']),
      error: (error: unknown) => {
        if (!(error instanceof ApiError)) throw error;
        this.startError.set(error.detail);
      },
    });
  }
}
