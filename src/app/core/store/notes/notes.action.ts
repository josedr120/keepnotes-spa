import { Action } from '@ngrx/store';
import { INote } from '../../models/INote';

export const CREATE_NOTE = '[CREATE] Note';
export const GET_NOTE = '[GET] Note';
export const UPDATE_NOTE = '[UPDATE] Note';
export const DELETE_NOTE = '[DELETE] Note';

export class CreateNote implements Action {
   readonly type = CREATE_NOTE;

   constructor(public payload: INote) {}
}

export class GetNotes implements Action {
   readonly type = GET_NOTE;

   constructor(public payload: INote[]) {}
}

export class UpdateNote implements Action {
   readonly type = UPDATE_NOTE;

   constructor(public payload: INote) {}
}

export class DeleteNote implements Action {
   readonly type = DELETE_NOTE;

   constructor(public payload: number) {}
}

export type All = CreateNote | GetNotes | UpdateNote | DeleteNote;
