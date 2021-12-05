import { Action } from '@ngrx/store';
import { IUser } from '../models/IUser';
import * as UserActions from './user.actions';

export interface UserAppState {
   user: IUser;
}

export const defaultState: UserAppState = {
   user: { id: '', username: '', email: '', profileImageUrl: '' },
};

export const ACTIONS = {
   USER: 'USER',
};

export function userReducer(state: UserAppState = defaultState, action: Action | any) {
   console.log(state, action.type);
   switch (action.type) {
      case UserActions.GET_USER:
         return action.payload;
         break;
      default:
         return state;
         break;
   }
}
