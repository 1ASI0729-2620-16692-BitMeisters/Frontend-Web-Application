import { Routes } from '@angular/router';
import { administratorGuard } from '../infrastructure/administrator.guard';
import { iamGuard } from '../infrastructure/iam.guard';

const signInForm = () => import('./views/sign-in-form/sign-in-form').then((m) => m.SignInForm);
const userList = () => import('./views/user-list/user-list').then((m) => m.UserList);

/**
 * Route tree for the IAM presentation views.
 */
export const iamRoutes: Routes = [
  { path: 'sign-in', loadComponent: signInForm, title: 'titles.signIn' },
  { path: '', loadComponent: userList, title: 'titles.users', canActivate: [iamGuard, administratorGuard] },
];
