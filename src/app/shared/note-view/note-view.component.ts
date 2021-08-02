import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { NoteService } from '../../core/services/note/note.service';
import { INote } from '../../core/models/INote';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteComponent } from '../note/note.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

interface NoteData {
   userId: string;
   noteId: string;
   note: INote;
}

@Component({
   templateUrl: './note-view.component.html',
   styleUrls: ['./note-view.component.scss'],
})
export class NoteViewComponent implements OnInit {
   userId!: string;
   noteId!: string;
   note: INote = <INote>{};
   noteUpdated: boolean = false;

   updateForm = this.formBuilder.group({
      title: [null],
      content: [null],
   });

   controls = {
      title: this.updateForm.get('title'),
      content: this.updateForm.get('content'),
   };

   constructor(private noteService: NoteService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<NoteComponent>, private authService: AuthService, @Inject(MAT_DIALOG_DATA) data: NoteData) {
      this.userId = data.userId;
      this.noteId = data.noteId;
      this.note = data.note;
   }

   ngOnInit(): void {
      this.getNote();

      this.dialogRef.updateSize('512px');

      console.log(this.dialogRef);
   }

   getNote() {
      if (this.note) {
         this.controls.title?.setValue(this.note.title);
         this.controls.content?.setValue(this.note.content);
      }

      // this.noteService.getNote(this.userId, this.noteId).subscribe({
      //    next: (note) => {
      //       this.note = note;
      //
      //       if (note) {
      //          this.noteUpdated = false;
      //          this.controls.title?.setValue(note.title);
      //          this.controls.content?.setValue(note.content);
      //       }
      //    },
      // });
   }

   updateNote(userId: string, noteId: string) {
      if (this.authService.isLoggedIn()) {
         this.noteUpdated = true;
         const updatedNote: INote = this.updateForm.getRawValue();

         this.noteService.updateNote(userId, noteId, updatedNote).subscribe({
            next: () => {
               this.noteUpdated = true;
            },
            complete: () => {
               // setTimeout(() => {
               //    this.noteUpdated = false;
               // }, 5000);
            },
         });
      }
   }
}
