import { Injectable } from '@angular/core';
import { IJwtPayload } from '../../models/IJwtPayload';

@Injectable({
   providedIn: 'root',
})
export class JwtService {
   constructor() {}

   setToken(token: string): void {
      return sessionStorage.setItem('token', token);
   }

   decodeToken(): IJwtPayload {
      const token = this.getToken();
      const jwtTokenPart = token.split('.')[1];

      return JSON.parse(atob(jwtTokenPart));
   }

   getToken(): string {
      return sessionStorage.getItem('token') as string;
   }

   removeToken(): void {
      return sessionStorage.removeItem('token');
   }

   isExpired(): boolean {
      const token = this.decodeToken();

      return new Date() >= new Date(token.exp * 1000);
   }
}
