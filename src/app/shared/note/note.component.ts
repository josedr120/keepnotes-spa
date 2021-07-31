import { Component, OnInit } from '@angular/core';
import { INote } from '../../core/models/INote';
import { NoteService } from '../../core/services/note/note.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { JwtService } from '../../core/services/jwt/jwt.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
   selector: 'app-note',
   templateUrl: './note.component.html',
   styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
   notes: INote[] = [];
   note: INote = <INote>{};

   noteForm = this.formBuilder.group({
      // id: [null],
      // userId: [null],
      title: [null],
      content: [null],
   });

   userId: string = this.jwtService.decodeToken().Id;
   scope: 'add' | 'update' = 'add';

   controls = {
      title: this.noteForm.get('title'),
      content: this.noteForm.get('content'),
   };

   constructor(private noteService: NoteService, private authService: AuthService, private jwtService: JwtService, private router: Router, private formBuilder: FormBuilder) {}

   ngOnInit(): void {
      const payload = this.jwtService.decodeToken();
      this.getNotes(payload.Id);
      this.getNoteId();
   }

   getNoteId() {
      return this.notes.map((res) => (this.note = res));
   }

   ifTest(userId: string = '', noteId: string = '') {
      if (this.scope === 'add') {
         this.createNote(userId);
      } else if (this.scope === 'update') {
         this.updateNote(userId, noteId);
      }
   }

   createNote(userId: string) {
      if (this.noteForm.valid) {
         const note: INote = this.noteForm.getRawValue();
         if (this.authService.isLoggedIn()) {
            this.noteService.createNote(userId, note).subscribe({
               next: () => {
                  this.scope = 'add';
                  alert('Created');
                  this.getNotes(userId);
                  this.controls.title?.reset();
                  this.controls.content?.reset();
               },
            });
         } else {
            alert('Your not logged in');
            this.router.navigate(['login']);
         }
      }
   }

   getNotes(userId: string) {
      this.noteService.getNotes(userId).subscribe({
         next: (notes: INote[]) => {
            if (notes) {
               this.notes = notes;
            }
         },
      });
   }

   updateNote(userId: string, noteId: string) {
      if (this.authService.isLoggedIn()) {
         const note = this.noteForm.getRawValue();
         this.noteService.updateNote(userId, noteId, note).subscribe({
            next: () => {
               alert('Hey');
            },
         });
      }
   }

   deleteNote(userId: string, noteId: string) {
      this.noteService.deleteNote(userId, noteId).subscribe({
         next: () => {
            alert('Deleted');
            this.getNotes(userId);
         },
      });
   }
}
