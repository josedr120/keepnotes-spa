import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ILogin } from '../../models/ILogin';
import { map } from 'rxjs/operators';
import { IAuthState } from '../../models/IAuthState';
import { IUser } from '../../models/IUser';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';
import { IRegister } from '../../models/IRegister';

@Injectable({
   providedIn: 'root',
})
export class AuthService implements OnDestroy {
   endpoint = 'https://localhost:5001/api';
   headers = new HttpHeaders().set('Content-Type', 'application/json');

   /*public authState: IAuthState = { isAuth: false, isLoading: false, token: null, isExpired: false, issuedToken: null };*/
   public authState = new BehaviorSubject<IAuthState>({ isAuth: false, isLoading: false, userId: null, isExpired: false, issuedToken: null });

   constructor(private http: HttpClient, private router: Router, private jwtService: JwtService, private userService: UserService) {}

   Register(register: IRegister): Observable<void> {
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

         const newAuthState: IAuthState = {
            isAuth: true,
            isLoading: true,
            userId: jwtPayload.Id,
            isExpired: this.jwtService.isExpired(),
            issuedToken: null,
         };

         this.authState.next(newAuthState);
      }

      return token !== null && !this.jwtService.isExpired();
   }

   doLogout() {
      const token = this.jwtService.getToken();

      if (token) {
         this.jwtService.removeToken();
         const newAuthState: IAuthState = {
            isAuth: false,
            isLoading: false,
            isExpired: true,
            issuedToken: null,
            userId: null,
         };
         this.authState.next(newAuthState);
      }
   }

   ngOnDestroy(): void {
      this.authState.complete();
   }
}
