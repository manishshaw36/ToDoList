import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Filter } from '../Item';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: firebase.User;
  email: string;
  filterItem: string;
  invalidLogin: boolean;
  filter: Filter;
  constructor(private service: AuthService, private afAuth: AngularFireAuth,
     private router: Router) {
    afAuth.authState.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.router.navigate(['/mytask']);
        localStorage.setItem('email', this.user.email);
      } else {
        this.invalidLogin = true;
      }
      console.log(this.user);
    });
  }

  auth() {
    this.service.login();
  }
  logOut() {
    this.service.logOut();
    localStorage.removeItem('email');
    this.router.navigate(['/']);
    location.reload();
    console.log('logout' + this.user);
  }

  ngOnInit() {

  }

}
