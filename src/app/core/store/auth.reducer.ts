import { Action } from '@ngrx/store';

export interface AuthAppState {
   isAuth: boolean;
   isLoading: boolean;
}

export const defaultState: AuthAppState = {
   isAuth: false,
   isLoading: false,
};

export const ACTIONS = {
   IS_LOGGED_IN: 'IS_LOGGED_IN',
};

export function authReducer(state: AuthAppState = defaultState, action: Action) {
   switch (action.type) {
      case ACTIONS.IS_LOGGED_IN:
         const newState: AuthAppState = {
            isAuth: true,
            isLoading: true,
         };
         return newState;
         break;
      default:
         return state;
         break;
   }
}
