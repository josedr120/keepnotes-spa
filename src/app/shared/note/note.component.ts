import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { INote } from '../../core/models/INote';
import { NoteService } from '../../core/services/note/note.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { JwtService } from '../../core/services/jwt/jwt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NoteViewComponent } from '../note-view/note-view.component';
import { IsEmptyOrNull } from '../../core/utils/NullOrEmptyChecker';
import Swal from 'sweetalert2';

@Component({
   selector: 'app-note',
   templateUrl: './note.component.html',
   styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
   isLoading: boolean = false;
   notes: INote[] = [];
   note: INote = <INote>{};
   payload = this.jwtService.decodeToken();
   inputOpenState: boolean = false;

   noteForm = this.formBuilder.group({
      // id: [null],
      // userId: [null],
      title: [null],
      content: [null],
   });

   userId: string = this.jwtService.decodeToken().Id;
   IsEmptyOrNull: boolean = false;

   controls = {
      title: this.noteForm.get('title'),
      content: this.noteForm.get('content'),
   };

   constructor(private noteService: NoteService, private authService: AuthService, private jwtService: JwtService, private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog, private route: ActivatedRoute) {}

   ngOnInit(): void {
      this.getNotes(this.payload.Id);
      this.getNoteId();
   }

   openDialog(userId: string, noteId: string, note: INote) {
      const dialogConfig: MatDialogConfig = new MatDialogConfig();

      dialogConfig.data = {
         userId,
         noteId,
         note,
      };

      const dialogRef = this.dialog.open(NoteViewComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(() => {
         this.getNotes(this.payload.Id);
      });
   }

   getNoteId() {
      return this.notes.map((res) => (this.note = res));
   }

   createNote(userId: string) {
      if (this.noteForm.valid) {
         const note: INote = this.noteForm.getRawValue();
         if (this.authService.isLoggedIn()) {
            if (IsEmptyOrNull(note.title) || IsEmptyOrNull(note.content)) {
               this.IsEmptyOrNull = true;
               Swal.fire('fields are empty');
            } else {
               this.IsEmptyOrNull = false;
               this.noteService.createNote(userId, note).subscribe({
                  next: () => {
                     this.getNotes(userId);
                     this.controls.title?.reset();
                     this.controls.content?.reset();
                  },
               });
            }
         } else {
            alert('Your not logged in');
            this.router.navigate(['login'], { relativeTo: this.route });
         }
      }
   }

   getNotes(userId: string) {
      this.noteService.getNotes(userId).subscribe({
         next: (notes: INote[]) => {
            this.isLoading = true;
            if (notes) {
               this.notes = notes;
               this.isLoading = false;
            }
         },
      });
   }

   deleteNote(userId: string, noteId: string) {
      Swal.fire({ title: 'Are you sure want to delete', confirmButtonText: 'Delete', confirmButtonColor: 'red', showCancelButton: true }).then((result) => {
         if (result.isConfirmed) {
            this.noteService.deleteNote(userId, noteId).subscribe({
               next: () => {
                  Swal.fire('Deleted!', '', 'success').then(() => {
                     this.getNotes(userId);
                  });
               },
            });
         } else {
            Swal.fire('Changes are not saved', '', 'info');
         }
      });
   }
}
