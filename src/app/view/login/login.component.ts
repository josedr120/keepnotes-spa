import { Component, OnInit } from '@angular/core';
import { IAuthState } from '../../core/models/IAuthState';
import { ILogin } from '../../core/models/ILogin';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ACTIONS, AuthAppState } from 'src/app/core/store/auth.reducer';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   public authState: IAuthState = <IAuthState>{};

   loginForm = this.formBuilder.group({
      username: [null],
      password: [null],
   });

   controls = {
      username: this.loginForm.get('username'),
      password: this.loginForm.get('password'),
   };

   loginDemo: ILogin = {
      username: 'josedr121',
      password: 'jordan1223hack',
   };

   constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private store: Store<any>, private jwt: JwtService) {}

   ngOnInit(): void {}

   Login() {
      const loginInfo: ILogin = this.loginForm.getRawValue();

      this.authService
         .login(loginInfo)
         .pipe(catchError(this.handleError))
         .subscribe({
            next: (res: any) => {
               this.jwt.setToken(res.token);
               this.router.navigateByUrl('dashboard');
               console.log('logged');
            },
         });
   }

   handleError(error: HttpErrorResponse) {
      if (error.status === 401) {
         // A client-side or network error occurred. Handle it accordingly.
         console.error('An error occurred:', error.error);

         Swal.fire('401 Unauthorized');
      } else {
         // The backend returned an unsuccessful response code.
         // The response body may contain clues as to what went wrong.
         console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }

      // Return an observable with a user-facing error message.
      return throwError('Something bad happened; please try again later.');
   }
}
