import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile, ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile:any ={} //Profile ={ email:'acdc152@gmail.com', name: 'Florescu', surname: 'Alexandru', sessions: 0, minutes: 0, tricks:0, terms:false, joinedat:0}
  userProfile=null;

  constructor( private router: Router, private profileService: ProfileService) {
    firebase.auth().onAuthStateChanged( user => {
       if (user){
         this.userProfile = user;
         // this.profileService.getProfiles().subscribe(profiles=> console.log(profiles));
         this.profileService.getProfile(user.uid).subscribe(profile =>{
            if(profile)
            {
              this.profile=profile;
              // if(this.profile.hasOwnProperty('joinedat'))

                this.profile.joinedat = new Date(this.profile.joinedat).toUTCString();
            }
          });
       }
     });

   }

  ngOnInit() {
  }

  continue(){
    if(this.profile.sessions >0)
      this.profile.sessions +=1;
    else this.profile.sessions = 1;
      this.profileService.updateProfile(this.userProfile.uid, this.profile as Profile);
      this.router.navigateByUrl('new-session')
  }
}
