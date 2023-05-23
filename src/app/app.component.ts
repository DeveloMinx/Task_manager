import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userLoggedIn: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,) {
  }

  ngOnInit() {
    // Subscribe to the authentication state changes
    this.afAuth.authState.subscribe(user => {
      this.userLoggedIn = !!user; // Update the property based on the authentication state
    });
  }

  logOut() {
    // Sign out the user and navigate to the home page
    this.afAuth.signOut().then(() => this.router.navigate(['/']));
  }
}