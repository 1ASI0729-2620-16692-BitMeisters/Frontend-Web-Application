import { Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ResultValue } from '../../../domain/model/valueobjects/result-value.enum';

@Component({
  selector: 'app-result-selector',
  imports: [MatIcon, TranslatePipe],
  template: `
    <div
      class="selector"
      role="radiogroup"
      [attr.aria-label]="label()"
      [attr.data-selected]="value() ?? null"
      [style.--index]="selectedIndex()"
    >
      <span class="indicator" [class.indicator-empty]="!value()" aria-hidden="true"></span>
      @for (option of options; track option.value) {
        <button
          type="button"
          role="radio"
          class="option"
          [attr.data-result]="option.value"
          [class.selected]="value() === option.value"
          [attr.aria-checked]="value() === option.value"
          [disabled]="disabled()"
          (click)="selected.emit(option.value)"
        >
          <mat-icon aria-hidden="true">{{ option.icon }}</mat-icon>
          <span>{{ 'inspection.result.' + option.value | translate }}</span>
        </button>
      }
    </div>
  `,
  styleUrl: './result-selector.css',
})
export class ResultSelector {
  readonly value = input<ResultValue | undefined>();
  readonly label = input.required<string>();
  readonly disabled = input(false);
  readonly selected = output<ResultValue>();

  protected readonly options = [
    { value: ResultValue.OK, icon: 'check' },
    { value: ResultValue.OBSERVED, icon: 'visibility' },
    { value: ResultValue.FAIL, icon: 'close' },
  ];

  protected readonly selectedIndex = computed(() =>
    Math.max(
      0,
      this.options.findIndex((option) => option.value === this.value()),
    ),
  );
}
