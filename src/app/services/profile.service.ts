import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Profile {
  id?: string;
  name: string;
  surname: string;
  email: string;
  sessions: number;
  minutes: number;
  tricks: number;
  terms: boolean;
  joinedat: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profilesCollection: AngularFirestoreCollection<Profile>;

  private profiles: Observable<Profile[]>;

  constructor(db: AngularFirestore) {
    this.profilesCollection = db.collection<Profile>('profiles');

    this.profiles = this.profilesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getProfiles() {
    return this.profiles;
  }

  getProfile(id) {
    //
    // console.log(this.profilesCollection);
    // console.log(id);
    // console.log(this.profilesCollection.doc(id).get());
    // // console.log(this.profilesCollection(id));
    // this.profilesCollection.doc(id).get().subscribe( (snapshot) => snapshot.forEach(value=>console.log(value.data)) )
    return this.profilesCollection.doc(id).valueChanges();
  }

  updateProfile(id: string, profile: Profile ) {
    // console.log(profile);
    // this.profilesCollection.doc(id).valueChanges().subscribe(val=> console.log(val));
    return this.profilesCollection.doc(id).update(profile);
    // this.profilesCollection.doc(id).valueChanges().subscribe(val=> console.log(val));
  }

  addProfile(id:string, profile: Profile) {
    profile.joinedat = Date.now();
    profile.sessions = 0;
    profile.tricks = 0;
    profile.minutes = 0;

    return this.profilesCollection.doc(id).set(profile);
  }

  removeProfile(id) {
    return this.profilesCollection.doc(id).delete();
  }
}
