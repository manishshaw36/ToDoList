import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: firebase.User;
  constructor(private service: AuthService, private afAuth: AngularFireAuth, private header: HeaderComponent) {
    afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  auth() {
    this.header.auth();
  }
  logOut() {
    this.header.logOut();
  }
  ngOnInit() {
  }

}
