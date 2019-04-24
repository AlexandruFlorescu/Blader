import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
//
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
// import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

// import firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userProfile=null;
  constructor(private router: Router,
              public facebook: Facebook,
              private afAuth: AngularFireAuth,
              private gplus: GooglePlus,
              private platform: Platform){
          firebase.auth().onAuthStateChanged( user => {
             if (user){
               this.userProfile = user;
             }
           });

  }
continue(){
  this.router.navigateByUrl('confirm-profile')
  this.router.navigateByUrl('confirm-profile')
}

continueWithFacebook(): Promise<any> {
  return this.facebook.login(['email'])
  .then( response => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then( success => {
          firebase.auth().onAuthStateChanged( user => {
             if (user){
               this.userProfile = user;
               console.log(this.userProfile);
             }
           });
           this.continue();
          console.log("Firebase success: " + JSON.stringify(success));
        });

    }).catch((error) => { console.log(error) });

}

 async nativeGoogleLogin() {
  console.log('triggered');
  try {

    const gplusUser = await this.gplus.login({
      'webClientId': '870585135693-0e8n1g9bftsumg667apkjn1fkr0igguj.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    })

    return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

    } catch(err) {
      console.log(err)
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

    } catch(err) {
      console.log(err)
    }

  }

  async continueWithGoogle() {
    if (this.platform.is('cordova')) {
      await this.nativeGoogleLogin();
    } else {
      await this.webGoogleLogin();
      }
    this.router.navigateByUrl('confirm-profile')

    }


signOut() {
  this.afAuth.auth.signOut();
  this.userProfile = null;
}

//
// async nativeGoogleLogin(): Promise<void> {
//   try {
//
//     const gplusUser = await this.gplus.login({
//       'webClientId': 'your-webClientId-XYZ.apps.googleusercontent.com',
//       'offline': true,
//       'scopes': 'profile email'
//     })
//
//     return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
//
//   } catch(err) {
//     console.log(err)
//   }
// }
//
// async webGoogleLogin(): Promise<void> {
//   try {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     const credential = await this.afAuth.auth.signInWithPopup(provider);
//
//   } catch(err) {
//     console.log(err)
//   }
//
// }
}
