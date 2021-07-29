import { Component, OnInit } from '@angular/core';
import { INote } from '../../core/models/INote';
import { NoteService } from '../../core/services/note/note.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { JwtService } from '../../core/services/jwt/jwt.service';

@Component({
   selector: 'app-note',
   templateUrl: './note.component.html',
   styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
   notes: INote[] = [];

   constructor(private noteService: NoteService, private authService: AuthService, private jwtService: JwtService) {}

   ngOnInit(): void {
      const payload = this.jwtService.decodeToken();
      this.getNotes(payload.Id);
   }

   getNotes(userId: string) {
      this.noteService.getNotes(userId).subscribe({
         next: (notes: INote[]) => {
            this.notes = notes;
         },
      });
   }
}
