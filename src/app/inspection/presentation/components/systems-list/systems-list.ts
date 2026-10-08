import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ItemSystem } from '../../../domain/model/item-system.enum';

export interface SystemProgress {
  system: ItemSystem;
  answered: number;
  total: number;
  complete: boolean;
  hasFindings: boolean;
}

@Component({
  selector: 'app-systems-list',
  imports: [MatIcon, TranslatePipe],
  template: `
    <ul class="systems">
      @for (progress of systems(); track progress.system; let index = $index) {
        <li>
          <button
            type="button"
            class="system"
            [class.current]="index === current()"
            [attr.aria-current]="index === current() ? 'step' : null"
            (click)="selected.emit(index)"
          >
            <mat-icon
              class="status"
              [class.status-complete]="progress.complete && !progress.hasFindings"
              [class.status-findings]="progress.hasFindings"
              aria-hidden="true"
            >
              {{ statusIcon(progress) }}
            </mat-icon>
            <span class="name">{{ 'inspection.system.' + progress.system | translate }}</span>
            <span class="detail">
              @if (progress.hasFindings) {
                {{ 'inspection.checklist.withFindings' | translate }}
              } @else if (progress.complete) {
                {{ 'inspection.checklist.complete' | translate }}
              } @else {
                {{
                  'inspection.checklist.answeredOf'
                    | translate: { answered: progress.answered, total: progress.total }
                }}
              }
            </span>
          </button>
        </li>
      }
    </ul>
  `,
  styleUrl: './systems-list.css',
})
export class SystemsList {
  readonly systems = input.required<SystemProgress[]>();
  readonly current = input.required<number>();
  readonly selected = output<number>();

  protected statusIcon(progress: SystemProgress): string {
    if (progress.hasFindings) return 'error';
    return progress.complete ? 'check_circle' : 'radio_button_unchecked';
  }
}
