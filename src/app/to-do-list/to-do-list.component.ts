import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FilterPipe } from '../filter.pipe';
import { MyhttpService } from '../myhttp.service';
declare var $: any;

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  items;
  filterItem: string;
  email = localStorage.getItem('email');
  taskName1: string;
  constructor(public service: MyhttpService) {
    console.log(service);
    this.items = service.getItem(this.email);
    this.filterItem = 'Filter: All';
  }

    taskCompleted: any;
    taskUpdate: any;
    date = new Date();
    taskCat1 = 'Add Category';
    taskPriority1 = 'Priority';
    describtion1: string;
    myId: string;
    myName: string;
    myTaskName: string;
    myTaskPriority: string;
    myDescribtion: string;
    myDate: string;
    mytime: string;
    count = 0;
    searchTerm: string;

    myFilter(filter) {
      if (filter.style.display === 'none') {
        $(filter).slideDown(600);
        } else {
        $(filter).slideUp(600);
        }
      }

    fil(b) {
        const v = 'Filter: ' + b.innerHTML;
        this.filterItem = v;
        console.log(this.filterItem);
        $('#f2').slideUp(600);
        $('#f1').slideUp(600);
        $('#fil').slideUp(600);
    }

    myFunction(a) {
      if (a === 'myDropdown1') {
      a.classList.toggle('show');
      } else {
      a.classList.toggle('show');
      }
    }

    myFunction1(a, b, c) {
      a.classList.toggle('d-none');
      b.classList.toggle('d-none');
      c.classList.toggle('d-none');
    }
    myFunction2(a, b) {
      this.taskCat1 = a;
      b.classList.toggle('show');
    }
    myFunction3(a, b) {
      this.taskPriority1 = a;
      b.classList.toggle('show');
    }
    myFunction4(a) {
      document.getElementById(a).classList.toggle('d-none');
    }


    add(a, b, c, d) {
      if (this.count === 0) {
      this.myName = this.taskName1;
      if (this.taskName1 === '' || this.taskName1  === undefined) {
        alert('Enter Task Name');
        return;
      }
      this.myTaskName = this.taskCat1;
      if (this.myTaskName === 'Add Category') {
        alert('Select Category');
        return;
      }
      this.myTaskPriority = this.taskPriority1;
      if (this.myTaskPriority === 'Priority') {
        alert('Select Priority');
        return;
      }
      this.myDescribtion = this.describtion1;
      if (this.myDescribtion === '' || this.myDescribtion === undefined) {
        alert('Enter Describtion About Your Task');
        return;
      }
      this.myDate = this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
      this.mytime = this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();

      const documentId = this.service.createItem();
      this.service.getCollection(documentId, this.myDate, this.myDescribtion, this.myTaskName, this.myName, this.myTaskPriority, this.mytime, this.email);
        this.taskCat1 = 'Add Category';
        this.taskPriority1 = 'Priority';
        this.taskName1 = '';
        this.describtion1 = '';
      } else {
        this.myTaskName = this.taskCat1;
        this.myDescribtion = this.describtion1;
        this.myName = this.taskName1;
        this.myTaskPriority = this.taskPriority1;
        this.service.updateItem(this.myId, this.myDate, this.myDescribtion, this.myTaskName, this.myName, this.myTaskPriority, this.mytime, this.email);
        this.count = 0;
        a.innerHTML = 'Add Now';
        this.taskCat1 = 'Add Category';
        this.taskPriority1 = 'Priority';
        this.taskName1 = '';
        this.describtion1 = '';
      }
      b.classList.toggle('d-none');
      c.classList.toggle('d-none');
      d.classList.toggle('d-none');
    }

    myDel(a, b) {

      if (b.innerHTML === 'Update Now') {
        alert('Please Update First');
        return;
      }
      this.service.deleteItem(a.id, this.email);

    }

    myTask(a) {

      this.service.completedTask(a.id, this.email);

    }
    myUpdate(a, b, c, d, e) {
      this.taskName1 = a.taskname;
      this.taskCat1 = a.taskcatogory;
      this.taskPriority1 = a.taskpriority;
      this.describtion1 = a.description;
      b.innerHTML = 'Update Now';
      this.myId = a.id;
      this.count = 1;
      this.myDate = a.date;
      this.mytime = a.time;
      c.classList.toggle('d-none');
      d.classList.toggle('d-none');
      e.classList.toggle('d-none');
    }
  ngOnInit() {

  }
}
