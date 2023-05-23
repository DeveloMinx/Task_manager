import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
  ) {
    // Initialize the form with form controls and validators
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  /**
   * Register a new user
   */
  registrar(): void {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassowrd = this.registrarUsuario.value.repetirPassword;

    console.log(this.registrarUsuario);

    // Check if the passwords match
    if (password !== repetirPassowrd) {
      this.toastr.error(
        'The passwords entered must be the same',
        'Error'
      );
      return;
    }

    this.loading = true;

    // Create user with email and password
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.verificarCorreo();
      })
      .catch((error) => {
        this.loading = false;
      });
  }

  /**
   * Send email verification to the registered user
   */
  verificarCorreo(): void {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info(
          'We sent you an email for verification',
          'Verify mail'
        );
        this.router.navigate(['/']);
      });
  }
}