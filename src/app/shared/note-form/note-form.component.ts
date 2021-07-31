import { Component, OnInit } from '@angular/core';
import { INote } from '../../core/models/INote';
import { NoteService } from '../../core/services/note/note.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../core/services/jwt/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
   templateUrl: './note-form.component.html',
   styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
   constructor(private noteService: NoteService, private jwtService: JwtService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

   ngOnInit(): void {}
}
