import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { IRegister } from '../../core/models/IRegister';
import { Router } from '@angular/router';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
   register: IRegister = {
      email: 'josedrgerena120@gmail.com',
      password: 'jordan1223hack',
      username: 'josedr121',
   };

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {}

   Register() {
      this.authService.register(this.register).subscribe({
         next: () => {
            this.router.navigateByUrl('dashboard');
            console.log('logged');
         },
      });
   }
}
