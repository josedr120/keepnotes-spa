import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { JwtService } from './core/services/jwt/jwt.service';
import { AuthService } from './core/services/auth/auth.service';
import { IAuthState } from './core/models/IAuthState';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   authState: IAuthState = <IAuthState>{};

   constructor(private authService: AuthService, private jwtService: JwtService, private router: Router) {}

   ngOnInit() {
      const token = this.jwtService.getToken();
      if (token) {
         this.authService.isLoggedIn();
         this.authState = this.authService.authState;
         this.isExpired();
      } else {
         this.authService.doLogout();

         this.authState = this.authService.authState;
      }
   }

   Logout() {
      this.authService.doLogout();

      this.router.navigate(['login']);
   }

   isExpired() {
      if (this.authState.isExpired) {
         this.Logout();
      }
   }
}
