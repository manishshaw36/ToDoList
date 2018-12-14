import { Injectable } from '@angular/core';
import { Item } from './Item';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class MyhttpService {

  itemsCollection: AngularFirestoreCollection<Item>;
  itemsDocument: AngularFirestoreDocument<Item>;
  filterValue: string;
  constructor(public db: AngularFirestore) {
  }
  getItem(email) {
    return this.db.collection(email).valueChanges();
  }
  getCollection(documentId, myDate, myDescribtion, myTaskName, myName, myTaskPriority, mytime, email) {

    this.itemsCollection = this.db.collection(email);
    this.itemsCollection.doc(documentId).set({
        date: myDate,
        description: myDescribtion,
        id: documentId,
        report: 'Pending',
        taskcatogory: myTaskName,
        taskname: myName,
        taskpriority: myTaskPriority,
        time: mytime
        });
  }
  createItem() {
    return this.db.createId();
  }
  updateItem(myId, myDate, myDescribtion, myTaskName, myName, myTaskPriority, mytime, email) {

     this.itemsDocument = this.db.doc(`${email}/${myId}`);
        this.itemsDocument.update({
          date: myDate,
          description: myDescribtion,
          id: myId,
          report: 'Pending',
          taskcatogory: myTaskName,
          taskname: myName,
          taskpriority: myTaskPriority,
          time: mytime
        });
  }
  deleteItem(myId, email) {
    this.itemsDocument = this.db.doc(`${email}/${myId}`);
    this.itemsDocument.delete();
  }
  completedTask(myId, email) {
    this.itemsDocument = this.db.doc(`${email}/${myId}`);
    this.itemsDocument.update({
      report: '0'
    });
  }
}
