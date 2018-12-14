import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;
  constructor(private route: Router, private auth_service: AngularFireAuth) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (localStorage.getItem('email')) {
      return true;
    }
    this.route.navigate(['/'],
    {queryParams: {returnUrl: state.url}});
    return false;
  }

  login() {
    this.auth_service.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logOut() {
    this.auth_service.auth.signOut();
  }
}
