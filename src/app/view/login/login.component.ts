import { Component, OnInit } from '@angular/core';
import { IAuthState } from '../../core/models/IAuthState';
import { ILogin } from '../../core/models/ILogin';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

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

   constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

   ngOnInit(): void {}

   Login() {
      const loginInfo: ILogin = this.loginForm.getRawValue();
      this.authService.login(loginInfo).subscribe({
         next: () => {
            this.router.navigateByUrl('dashboard');
            console.log('logged');
         },
      });
   }
}
