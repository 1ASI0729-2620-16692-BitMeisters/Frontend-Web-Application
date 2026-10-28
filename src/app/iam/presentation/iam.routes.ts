import { Routes } from '@angular/router';

const signInForm = () => import('./views/sign-in-form/sign-in-form').then((m) => m.SignInForm);

/**
 * Route tree for the IAM presentation views.
 */
export const iamRoutes: Routes = [{ path: 'sign-in', loadComponent: signInForm, title: 'titles.signIn' }];
