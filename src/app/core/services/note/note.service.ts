import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from '../../models/INote';
import { map } from 'rxjs/operators';

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
}
