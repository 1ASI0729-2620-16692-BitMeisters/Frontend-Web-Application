import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FleetStore } from '../../../application/fleet.store';

@Component({
  selector: 'app-fleet-list',
  imports: [RouterLink, TranslatePipe, MatButtonModule, MatCardModule],
  templateUrl: './fleet-list.html',
  styleUrl: './fleet-list.css',
})
export class FleetList {
  protected readonly store = inject(FleetStore);
}
