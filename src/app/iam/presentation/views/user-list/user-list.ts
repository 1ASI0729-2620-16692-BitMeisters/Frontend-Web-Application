import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { IamStore } from '../../../application/iam.store';
import { Role } from '../../../domain/model/role.enum';

/**
 * Lists the accounts of the company with their role and status.
 */
@Component({
  selector: 'app-user-list',
  imports: [
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    TranslatePipe,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  protected readonly store = inject(IamStore);
  protected readonly roles = Object.values(Role);
  protected readonly displayedColumns = ['name', 'email', 'role', 'status'];

  ngOnInit(): void {
    this.store.loadUsers({ page: 0 });
  }

  filterByRole = (role: Role | null): void => this.store.loadUsers({ role, page: 0 });

  filterByStatus = (isActive: boolean | null): void => this.store.loadUsers({ isActive, page: 0 });

  changePage = (event: PageEvent): void => this.store.loadUsers({ page: event.pageIndex, size: event.pageSize });
}
