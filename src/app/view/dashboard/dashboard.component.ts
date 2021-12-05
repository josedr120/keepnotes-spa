import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAuthState } from '../../core/models/IAuthState';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../core/services/jwt/jwt.service';
import { UserService } from '../../core/services/user/user.service';
import { IUser } from '../../core/models/IUser';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ACTIONS, UserAppState } from '../../core/store/user.reducer';
import * as UserActions from 'src/app/core/store/user.actions';

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
   authState: IAuthState = <IAuthState>{};
   authState$: Observable<IAuthState> = <Observable<IAuthState>>{};
   user: IUser = <IUser>{};
   user$: Observable<IUser> = <Observable<IUser>>{};

   constructor(private authService: AuthService, private userService: UserService, private router: Router, private jwtService: JwtService, private store: Store<any>) {}

   ngOnInit(): void {
      const jwtPayload = this.jwtService.decodeToken();
      this.authState = this.authService.authState;
      this.getUser(jwtPayload.Id);

      this.authState$ = this.store.select('auth');
      this.user$ = this.store.select('user');

      // this.user$.subscribe((res) => console.log(res));
      // this.authState$.subscribe((res) => console.log(res));
   }

   getUser(userId: string) {
      this.userService.getUser(userId).subscribe({
         next: (user: IUser) => {
            this.store.dispatch(new UserActions.GetUser(user));
            this.user = user;
            // console.log(user);
         },
      });
   }
}
