import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../models/IUser';
import { map } from 'rxjs/operators';
import { IAuthState } from '../../models/IAuthState';
import { AuthService } from '../auth/auth.service';
import { IUpdateForUser } from '../../models/IUpdateForUser';

interface IUserService {
   getUser: (userId: string) => Observable<IUser>;
   updateUser: (userId: string, updateForUser: IUpdateForUser) => Observable<IUpdateForUser>;
   deleteUser: (userId: string) => Observable<void>;
}

@Injectable({
   providedIn: 'root',
})
export class UserService implements IUserService {
   endpoint = 'https://localhost:5001/api';

   constructor(private http: HttpClient) {}

   getUser(userId: string): Observable<IUser> {
      let api = `${this.endpoint}/user/${userId}`;

      return this.http.get<IUser>(api).pipe(
         map((res: IUser) => {
            return res;
         })
      );
   }

   updateUser(userId: string, updateForUser: IUpdateForUser): Observable<IUpdateForUser> {
      let api = `${this.endpoint}/user/${userId}`;
      return this.http.put<IUpdateForUser>(api, updateForUser);
   }

   deleteUser(userId: string): Observable<void> {
      let api = `${this.endpoint}/user/${userId}`;
      return this.http.delete<void>(api);
   }
}
