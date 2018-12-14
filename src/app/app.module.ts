import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { MyhttpService } from './myhttp.service';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { SearchPipe } from './search.pipe';
import * as $ from 'jquery';
import { FilterPipe } from './filter.pipe';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    SearchPipe,
    FilterPipe,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([

      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'mytask',
        component: ToDoListComponent, canActivate: [AuthService]
      },
      {
        path: '**',
        component: HomeComponent
      }
    ]),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'toDolist'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [MyhttpService, AuthService, HeaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
