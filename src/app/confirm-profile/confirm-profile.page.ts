import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile, ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-confirm-profile',
  templateUrl: './confirm-profile.page.html',
  styleUrls: ['./confirm-profile.page.scss'],
})
export class ConfirmProfilePage implements OnInit {

  profile:any={};// { email:'acdc152@gmail.com', name: 'Florescu', surname: 'Alexandru', sessions: 0, minutes: 0, tricks:0, terms:false, joinedat:0}
  userProfile=null;
  new=true;

  constructor(public toastController: ToastController, private router: Router, private profileService: ProfileService) {
  this.presentToast();
  firebase.auth().onAuthStateChanged( user => {
     if (user){
       this.userProfile = user;
       // this.profileService.getProfiles().subscribe(profiles=> console.log(profiles));
       this.profileService.getProfile(user.uid).subscribe(profile =>{if(profile) {this.profile=profile; this.new=false}});
     }
   });
 }
  ngOnInit() {
  }

  async presentToast() {
    // if(this.new)
   const toast = await this.toastController.create({
     message: 'Your new account has been created. Welcome',
     duration: 2000,
     color:'primary',
     position:'top'
   });
   // else
   // const toast = await this.toastController.create({
   //   message: 'Welcome back. Would you like to change anything?',
   //   duration: 2000,
   //   position:'top'
   // });

   toast.present();
 }

 Continue(){
   this.saveProfile();
   this.router.navigateByUrl('profile')

 }
 saveProfile(){
   // TODO: save the profile to firebase
   console.log('NEW');
   console.log(this.new);
   if(this.new)
    this.profileService.addProfile(this.userProfile.uid, this.profile as Profile)
  else
    this.profileService.updateProfile(this.userProfile.uid, this.profile as Profile);
 }

}
