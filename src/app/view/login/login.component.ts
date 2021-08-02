import { Component, OnInit } from '@angular/core';
import { IAuthState } from '../../core/models/IAuthState';
import { ILogin } from '../../core/models/ILogin';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   public authState: IAuthState = <IAuthState>{};

   loginDemo: ILogin = {
      username: 'josedr121',
      password: 'jordan1223hack',
   };

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {}

   Login(login: ILogin) {
      this.authService.login(login).subscribe({
         next: () => {
            this.router.navigateByUrl('dashboard');
            console.log('logged');
         },
      });
   }
}
