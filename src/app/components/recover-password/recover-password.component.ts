import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
  ) {
    // Initialize the form with form controls and validators
    this.recuperarUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  /**
   * Recover password for the user
   */
  recuperar(): void {
    const email = this.recuperarUsuario.value.correo;

    this.loading = true;

    // Send password reset email to the user's email address
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.toastr.info('We sent you an email to reset your password', 'Recover Password');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.loading = false;
      });
  }
}