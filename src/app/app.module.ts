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
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { NoteFormComponent } from './shared/note-form/note-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoteViewComponent } from './shared/note-view/note-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FooterComponent } from './view/footer/footer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './view/register/register.component';

@NgModule({
   declarations: [AppComponent, LoginComponent, HomeComponent, DashboardComponent, UserProfileComponent, NoteComponent, NoteFormComponent, NoteViewComponent, FooterComponent, RegisterComponent],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatCardModule,
      MatGridListModule,
      MatListModule,
      MatFormFieldModule,
      MatInputModule,
      StoreModule.forRoot({}, {}),
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      SweetAlert2Module,
      MatExpansionModule,
      MatProgressSpinnerModule,
   ],
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
