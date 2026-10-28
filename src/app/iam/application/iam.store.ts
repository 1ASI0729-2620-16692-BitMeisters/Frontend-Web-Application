import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SignInCommand } from '../domain/model/sign-in.command';
import { User } from '../domain/model/user.entity';
import { IamApi } from '../infrastructure/iam-api';
import { SignInResource } from '../infrastructure/sign-in-response';
import { UserAssembler } from '../infrastructure/user-assembler';

const SESSION_KEY = 'fleetsafe-session';

/**
 * Holds the IAM session state and orchestrates the authentication flows.
 */
@Injectable({ providedIn: 'root' })
export class IamStore {
  private readonly iamApi = inject(IamApi);
  private readonly userAssembler = new UserAssembler();

  private readonly sessionSignal = signal<SignInResource | null>(this.restoreSession());

  private readonly signingInSignal = signal<boolean>(false);
  readonly signingIn = this.signingInSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly isSignedIn = computed(() => this.sessionSignal() !== null);

  readonly currentToken = computed(() => this.sessionSignal()?.token ?? null);

  readonly currentUser = computed(() => {
    const session = this.sessionSignal();
    return session ? this.userAssembler.toEntityFromResource(session.user) : null;
  });

  signIn(signInCommand: SignInCommand, router: Router, returnUrl = '/home'): void {
    if (this.signingInSignal()) return;
    this.signingInSignal.set(true);
    this.errorSignal.set(null);
    this.iamApi.signIn(signInCommand).subscribe({
      next: (session) => {
        this.saveSession(session);
        this.signingInSignal.set(false);
        router.navigateByUrl(returnUrl).then();
      },
      error: (error: HttpErrorResponse) => {
        this.errorSignal.set(
          error.status === 401 ? 'iam.signIn.invalidCredentials' : error.status === 0 ? 'errors.network' : 'errors.server',
        );
        this.signingInSignal.set(false);
      },
    });
  }

  signOut(router: Router): void {
    this.clearSession();
    router.navigate(['/iam/sign-in']).then();
  }

  hasRole(...roles: User['role'][]): boolean {
    return this.currentUser()?.hasRole(...roles) ?? false;
  }

  clearSession(): void {
    this.sessionSignal.set(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      return;
    }
  }

  private saveSession(session: SignInResource): void {
    this.sessionSignal.set(session);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      return;
    }
  }

  private restoreSession(): SignInResource | null {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (!stored) return null;
      const session = JSON.parse(stored) as SignInResource;
      if (!session.token || !session.user || session.expiresAt <= Date.now()) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }
}
