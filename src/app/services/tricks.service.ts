import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Trick {
  id?: string;
  category:string
  uid: string
  name: string
  score: number
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class TrickService {
  private tricksCollection: AngularFirestoreCollection<Trick>;

  private tricks: Observable<Trick[]>;

  constructor(db: AngularFirestore) {
    this.tricksCollection = db.collection<Trick>('tricks');

    this.tricks = this.tricksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getTricks() {
    console.log(this.tricks);
    return this.tricks;

  }

  getTrick(id) {
    //
    // console.log(this.tricksCollection);
    // console.log(id);
    // console.log(this.tricksCollection.doc(id).get());
    // // console.log(this.tricksCollection(id));
    // this.tricksCollection.doc(id).get().subscribe( (snapshot) => snapshot.forEach(value=>console.log(value.data)) )
    return this.tricksCollection.doc(id).valueChanges();
  }

  // updateTrick(id: string, trick: Trick ) {
  //   console.log(trick);
  //   this.tricksCollection.doc(trick.id).valueChanges().subscribe(val=> console.log(val));
  //   return this.tricksCollection.doc(id).update(trick);
  //   this.tricksCollection.doc(id).valueChanges().subscribe(val=> console.log(val));
  // }



  addTrick(trick: Trick) {
    return this.tricksCollection.add(trick);
  }

  removeTrick(id) {
    return this.tricksCollection.doc(id).delete();
  }
}
