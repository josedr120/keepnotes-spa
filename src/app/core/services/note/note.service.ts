import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface INoteService {}

@Injectable({
   providedIn: 'root',
})
export class NoteService implements INoteService {
   constructor(private http: HttpClient) {}
}
