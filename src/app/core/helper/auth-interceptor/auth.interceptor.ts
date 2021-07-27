import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '../../services/jwt/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(private jwtService: JwtService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const authToken = this.jwtService.getToken();

      if (authToken) {
         let clone = request.clone({
            setHeaders: {
               Authorization: `Bearer ${authToken}`,
            },
         });

         return next.handle(clone);
      } else {
         return next.handle(request);
      }
   }
}
