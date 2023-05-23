import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    // Initialize the form with form controls and validators
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  /**
   * Log in the user
   */
  login(): void {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loading = true;

    // Sign in the user with email and password
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if (user.user?.emailVerified) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/verify']);
      }
    }).catch((error) => {
      this.loading = false;
    });
  }
}