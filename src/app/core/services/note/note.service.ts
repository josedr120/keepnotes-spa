import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from '../../models/INote';
import { map } from 'rxjs/operators';
import { not } from 'rxjs/internal-compatibility';

interface INoteService {}

@Injectable({
   providedIn: 'root',
})
export class NoteService implements INoteService {
   endpoint = 'https://localhost:5005/api';

   constructor(private http: HttpClient) {}

   createNote(userId: string, note: INote): Observable<void> {
      let api = `${this.endpoint}/note/${userId}/create`;

      return this.http.post<void>(api, note);
   }

   getNotes(userId: string): Observable<INote[]> {
      let api = `${this.endpoint}/note/${userId}`;
      return this.http.get<INote[]>(api).pipe(
         map((res) => {
            return res;
         })
      );
   }

   getNote(userId: string, noteId: string): Observable<INote> {
      let api = `https://localhost:5005/api/note/${userId}/${noteId}`;

      return this.http.get<INote>(api);
   }

   updateNote(userId: string, noteId: string, update: INote | null): Observable<boolean> {
      let api = `https://localhost:5005/api/note/${userId}/${noteId}`;
      return this.http.put<boolean>(api, update);
   }

   deleteNote(userId: string, noteId: string): Observable<boolean> {
      let api = `https://localhost:5005/api/note/${userId}/${noteId}`;
      return this.http.delete<boolean>(api);
   }
}
