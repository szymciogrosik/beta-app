import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserGuard } from './_guards/user.guard';
import { LoginComponent } from './login/login.component';
import { RedirectionEnum } from '../utils/redirection.enum';
import { AdminGuard } from './_guards/admin.guard';
import { DetailsComponent } from './user/details/details.component';
import { UserComponent } from './user/user.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { BibleComponent } from './bible/bible.component';
import { ConnectionComponent } from './connection/connection.component';

const appRoutes: Routes = [
  {
    path: RedirectionEnum.HOME,
    component: HomeComponent
  },
  {
    path: RedirectionEnum.BIBLE,
    component: BibleComponent
  },
  {
    path: RedirectionEnum.LOGIN,
    component: LoginComponent
  },
  {
    path: RedirectionEnum.ADMIN,
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: RedirectionEnum.USER,
    component: UserComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: RedirectionEnum.USER, pathMatch: 'full' },
      { path: RedirectionEnum.USER_DETAILS, component: DetailsComponent },
      { path: RedirectionEnum.USER_CHANGE_PASSWORD, component: ChangePasswordComponent }
    ]
  },
  {
    path: RedirectionEnum.CONNECTION,
    component: ConnectionComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
