import { Action } from '@ngrx/store';
import * as NotesActions from './notes.action';
import { INote } from '../../models/INote';

export const defaultState: INote = <INote>{};

export function notesReducer(state: INote[] = [defaultState], action: Action | any) {
   console.log(state, action.type);
   switch (action.type) {
      case NotesActions.CREATE_NOTE:
         return state.concat(action.payload);
         break;
      case NotesActions.GET_NOTE:
         return action.payload;
         break;
      case NotesActions.DELETE_NOTE:
         return [...state.splice(action.payload, 1), ...state];
         break;
      default:
         return state;
         break;
   }
}
