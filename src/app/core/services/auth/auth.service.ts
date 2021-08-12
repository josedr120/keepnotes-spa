import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ILogin } from '../../models/ILogin';
import { map } from 'rxjs/operators';
import { IAuthState } from '../../models/IAuthState';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';
import { IRegister } from '../../models/IRegister';

@Injectable({
   providedIn: 'root',
})
export class AuthService implements OnDestroy {
   endpoint = 'https://localhost:5005/api';
   headers = new HttpHeaders().set('Content-Type', 'application/json');

   public authState: IAuthState = { isAuth: false, isLoading: false, userId: null, isExpired: false };

   constructor(private http: HttpClient, private router: Router, private jwtService: JwtService, private userService: UserService) {}

   register(register: IRegister): Observable<void> {
      let api = `${this.endpoint}/auth/register`;
      return this.http.post<IRegister>(api, register).pipe(
         map((res: any) => {
            this.jwtService.setToken(res.token);
         })
      );
   }

   login(login: ILogin): Observable<void> {
      let api = `${this.endpoint}/auth/login`;
      return this.http.post<ILogin>(api, login).pipe(
         map((res: any) => {
            this.jwtService.setToken(res.token);
         })
      );
   }

   isLoggedIn(): boolean {
      const token = this.jwtService.getToken();
      if (token) {
         const jwtPayload = this.jwtService.decodeToken();

         this.authState.isAuth = true;
         this.authState.isLoading = true;
         this.authState.isExpired = this.jwtService.isExpired();
         this.authState.userId = jwtPayload.Id;
      }

      return token !== null && !this.jwtService.isExpired();
   }

   doLogout() {
      const token = this.jwtService.getToken();

      if (token) {
         this.jwtService.removeToken();

         this.authState.isAuth = false;
         this.authState.isLoading = false;
         this.authState.isExpired = true;
         this.authState.userId = null;
      }
   }

   ngOnDestroy(): void {}
}
