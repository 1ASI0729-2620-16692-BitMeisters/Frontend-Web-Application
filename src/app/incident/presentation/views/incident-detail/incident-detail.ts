import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { IncidentStore } from '../../../application/incident.store';

/**
 * Displays detailed information about a single incident.
 */
@Component({
  selector: 'app-incident-detail',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    TranslatePipe,
  ],
  templateUrl: './incident-detail.html',
  styleUrl: './incident-detail.css',
})
export class IncidentDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(IncidentStore);

  /**
   * The incident ID from the route.
   */
  readonly incidentId = computed(() => this.route.snapshot.params['id']);

  /**
   * The incident entity.
   */
  readonly incident = computed(() => this.store.getIncidentById(this.incidentId())());

  /**
   * Navigates to the corrective action form.
   */
  addCorrectiveAction() {
    this.router.navigate(['incidents', this.incidentId(), 'corrective-actions', 'new']).then();
  }

  /**
   * Navigates to the repair form.
   */
  scheduleRepair() {
    this.router.navigate(['incidents', this.incidentId(), 'repairs', 'new']).then();
  }

  /**
   * Navigates to the follow-up form.
   */
  addFollowUp() {
    this.router.navigate(['incidents', this.incidentId(), 'follow-ups', 'new']).then();
  }

  /**
   * Navigates back to the incident list.
   */
  goBack() {
    this.router.navigate(['incidents']).then();
  }
}
