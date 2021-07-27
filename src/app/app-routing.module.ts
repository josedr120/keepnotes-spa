import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { AuthGuard } from './core/helper/auth-guard/auth.guard';
import { HomeComponent } from './view/home/home.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';

const routes: Routes = [
   { path: '', component: HomeComponent, pathMatch: 'full' },
   /*{ path: 'register', component: undefined },*/
   { path: 'login', component: LoginComponent },
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
   { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
   /*{
      path: 'dashboard',
      children: [
         {
            path: 'notes',
            component: undefined,
         },
      ],
      canActivate: [AuthGuard],
   },*/
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
