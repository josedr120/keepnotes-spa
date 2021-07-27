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

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit() {}

   Logout() {
      this.authService.doLogout();

      this.router.navigate(['login']).then(() => window.location.reload());
   }

   isExpired() {
      if (this.authState.isExpired) {
         this.Logout();
      }
   }
}
