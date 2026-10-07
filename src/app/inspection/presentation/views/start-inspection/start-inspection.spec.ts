import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CurrentUser } from '../../../../shared/application/current-user';
import { ApiError } from '../../../../shared/infrastructure/http/api-error';
import { InspectionStore } from '../../../application/inspection.store';
import { AssignedVehicle } from '../../../domain/model/valueobjects/assigned-vehicle';
import { StartInspection } from './start-inspection';

const vehicle = new AssignedVehicle({
  vehicleId: 'vehicle-1',
  plate: 'ABC-123',
  brand: 'Volvo',
  model: 'FH 460',
  type: 'Tractor unit',
  assignedFrom: new Date('2026-09-01'),
});

function fakeStore(state: { value?: AssignedVehicle; error?: ApiError; isLoading?: boolean }) {
  return {
    assignedVehicle: {
      value: signal(state.value),
      error: signal(state.error),
      isLoading: signal(state.isLoading ?? false),
      reload: vi.fn(),
    },
    starting: signal(false),
    startInspection: vi.fn(() => of({ id: 'inspection-1' })),
  };
}

function render(store: ReturnType<typeof fakeStore>) {
  TestBed.configureTestingModule({
    imports: [StartInspection],
    providers: [
      provideRouter([]),
      provideTranslateService(),
      { provide: InspectionStore, useValue: store },
      {
        provide: CurrentUser,
        useValue: {
          user: signal({
            id: 'driver-1',
            companyId: 'company-1',
            firstName: 'Juan',
            lastName: 'Mendoza',
          }),
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(StartInspection);
  fixture.detectChanges();
  return fixture;
}

describe('StartInspection', () => {
  it('shows the assigned vehicle', () => {
    const fixture = render(fakeStore({ value: vehicle }));

    expect(fixture.nativeElement.textContent).toContain('ABC-123');
    expect(fixture.nativeElement.textContent).toContain('Volvo FH 460');
  });

  it('tells the driver when no vehicle is assigned', () => {
    const fixture = render(
      fakeStore({ error: new ApiError(404, 'Not Found', 'No vehicle assigned.') }),
    );

    expect(fixture.nativeElement.textContent).toContain('inspection.assignedVehicle.none');
    expect(fixture.nativeElement.querySelector('form')).toBeNull();
  });

  it('does not start the inspection without an odometer reading', () => {
    const store = fakeStore({ value: vehicle });
    const fixture = render(store);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(store.startInspection).not.toHaveBeenCalled();
  });

  it('starts the inspection and opens its checklist', () => {
    const store = fakeStore({ value: vehicle });
    const fixture = render(store);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '184320';
    input.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(store.startInspection).toHaveBeenCalledWith(
      expect.objectContaining({ odometer: 184320 }),
    );
    expect(navigate).toHaveBeenCalledWith(['/inspections', 'inspection-1', 'execute']);
  });
});
