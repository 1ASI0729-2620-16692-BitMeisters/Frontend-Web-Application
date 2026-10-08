import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { FleetStore } from '../../../application/fleet.store';

@Component({
  selector: 'app-vehicle-list',
  imports: [RouterLink, TranslatePipe, MatButtonModule, MatTableModule],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css',
})
export class VehicleList {
  protected readonly store = inject(FleetStore);

  protected readonly displayedColumns = [
    'plate',
    'brand',
    'model',
    'year',
    'type',
    'status',
    'actions',
  ];
}
