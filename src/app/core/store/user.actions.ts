import { Action } from '@ngrx/store';
import { IUser } from '../models/IUser';

export const GET_USER = '[GET] User';
export class GetUser implements Action {
   readonly type = GET_USER;

   constructor(public payload: IUser) {}
}

export type All = GetUser;
