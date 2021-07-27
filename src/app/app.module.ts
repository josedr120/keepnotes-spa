import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { AuthInterceptor } from './core/helper/auth-interceptor/auth.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { NoteComponent } from './shared/note/note.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
   declarations: [AppComponent, LoginComponent, HomeComponent, DashboardComponent, UserProfileComponent, NoteComponent],
   imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatGridListModule],
   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true,
      },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
