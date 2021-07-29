import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAuthState } from '../../core/models/IAuthState';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../core/services/jwt/jwt.service';
import { UserService } from '../../core/services/user/user.service';
import { IUser } from '../../core/models/IUser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
   authState: IAuthState = <IAuthState>{};
   user: IUser = <IUser>{};

   constructor(private authService: AuthService, private userService: UserService, private router: Router, private jwtService: JwtService) {}

   ngOnInit(): void {
      const jwtPayload = this.jwtService.decodeToken();
      this.authState = this.authService.authState;
      this.getUser(jwtPayload.Id);
   }

   getUser(userId: string) {
      this.userService.getUser(userId).subscribe({
         next: (user: IUser) => {
            this.user = user;
            console.log(user);
         },
      });
   }
}
