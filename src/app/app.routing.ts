import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './login/auth.guard';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  /* Every other route redirects to home */
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);
