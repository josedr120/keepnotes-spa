import { IUser } from './IUser';
import { INote } from './INote';

export interface IAuthState {
   isAuth: boolean;
   isLoading: boolean;
   isExpired: boolean;
   userId: string | null;
}
