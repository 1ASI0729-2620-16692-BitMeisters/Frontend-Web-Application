import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { NotificationSeverity } from '../../application/notifier';

export interface NotificationToastData {
  severity: NotificationSeverity;
  message: string;
  dismissLabel?: string;
}

const ICON_BY_SEVERITY: Record<NotificationSeverity, string> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

@Component({
  selector: 'app-notification-toast',
  imports: [MatIcon, MatIconButton, MatSnackBarAction, MatSnackBarLabel],
  template: `
    <div class="toast" [class]="'toast toast-' + data.severity">
      <span class="badge" aria-hidden="true">
        <mat-icon>{{ icon }}</mat-icon>
      </span>
      <p class="message" matSnackBarLabel>{{ data.message }}</p>
      @if (data.dismissLabel) {
        <button
          mat-icon-button
          matSnackBarAction
          type="button"
          [attr.aria-label]="data.dismissLabel"
          (click)="reference.dismissWithAction()"
        >
          <mat-icon>close</mat-icon>
        </button>
      }
    </div>
  `,
  styleUrl: './notification-toast.css',
})
export class NotificationToast {
  protected readonly data = inject<NotificationToastData>(MAT_SNACK_BAR_DATA);
  protected readonly reference = inject(MatSnackBarRef<NotificationToast>);
  protected readonly icon = ICON_BY_SEVERITY[this.data.severity];
}
