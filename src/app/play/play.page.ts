import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

import { Profile, ProfileService } from '../services/profile.service';
import { Trick, TrickService } from '../services/tricks.service';
import { ParamsService } from '../services/params.service';
@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  profile:any ={} ;
  userProfile=null;
  startDate = 0;
  minutes = 0 ;
  params:any={};
  rawtricks:Trick[] = [];
  tricks:Trick[] = [];
  easy: Trick[] = [];
  moderate: Trick[] = [];
  pro: Trick[] = [];
  goat: Trick[] = [];

constructor(private router: Router, private profileService: ProfileService, private paramsService: ParamsService, private route:ActivatedRoute, private trickService: TrickService) {
  this.startDate = Date.now();

  firebase.auth().onAuthStateChanged( user => {
     if (user){
       this.userProfile = user;
       this.profileService.getProfile(user.uid).subscribe(profile =>{
          if(profile)
          {
            this.profile=profile;
          }
        });
     }
   });

  // this.params = this.paramsService.get();
  // this.trickService.getTricks().subscribe(tricks =>{
  //     // console.log(tricks);
  //     tricks.forEach(trick=> {
  //       // console.log(trick);
  //       if(this.params.type == trick.type){
  //         if(Number(trick.score) < 3.9)
  //           this.easy.push(trick);
  //         if(Number(trick.score) >= 4 && Number(trick.score)<=5.9)
  //           this.moderate.push(trick);
  //         if(Number(trick.score) >= 6 && Number(trick.score)<=7.9)
  //           this.pro.push(trick);
  //         if(Number(trick.score) >= 8 && Number(trick.score)<=10.9)
  //           this.goat.push(trick);
  //         }
  //     })
  //   this.makePool();
  //   // console.log(this.easy, this.moderate, this.pro, this.goat)
  //   }
  // );
}


 makePool(){
   // let params = this.router.getCurrentNavigation().extras;
   let pool: Trick[] = [];

   if(this.params.level == 'easy')
      {
        let easyP = []
        while(easyP.length < 27){
          let r = Math.floor(Math.random()*this.easy.length);
          if(easyP.indexOf(this.easy[r]) === -1) easyP.push(this.easy[r]);
        }

        let moderateP = []
        while(moderateP.length < 3){
          let r = Math.floor(Math.random()*this.moderate.length);

          // if(this.hasDuplicates(moderateP))
          //   moderateP.pop();
          if(moderateP.indexOf(this.moderate[r]) === -1) moderateP.push(this.moderate[r]);
        }

      console.log(easyP, moderateP);
      pool = easyP.concat(moderateP);
      console.log(pool);
      }
    if(this.params.level == 'moderate')
       {
         let easyP = []
         while(easyP.length < 6){
           let r = Math.floor(Math.random()*this.easy.length);
           if(easyP.indexOf(this.easy[r]) === -1) easyP.push(this.easy[r]);
           else {
             console.log(this.easy[r])
             console.log(easyP)

           }
         }

         let moderateP = []
         while(moderateP.length < 18){
           let r = Math.floor(Math.random()*this.moderate.length);
           if(moderateP.indexOf(this.moderate[r]) === -1) moderateP.push(this.moderate[r]);
         }

         let proP = []
         while(proP.length < 6){
           let r = Math.floor(Math.random()*this.pro.length);
           if(proP.indexOf(this.pro[r]) === -1) proP.push(this.pro[r]);
         }

       pool = easyP.concat(moderateP).concat(proP);
       console.log(pool);
       }
     if(this.params.level == 'pro')
        {
          let easyP = []
          while(easyP.length < 3){
            let r = Math.floor(Math.random()*this.easy.length);
            if(easyP.indexOf(this.easy[r]) === -1) easyP.push(this.easy[r]);
          }

          let moderateP = []
          while(moderateP.length < 7){
            let r = Math.floor(Math.random()*this.moderate.length);
            if(moderateP.indexOf(this.moderate[r]) === -1) moderateP.push(this.moderate[r]);
          }

          let proP = []
          while(proP.length < 15){
            let r = Math.floor(Math.random()*this.pro.length);
            if(proP.indexOf(this.pro[r]) === -1) proP.push(this.pro[r]);
          }

          let goatP = []
          while(goatP.length < 5){
            let r = Math.floor(Math.random()*this.goat.length);
            if(goatP.indexOf(this.goat[r]) === -1) goatP.push(this.goat[r]);
          }

        pool = easyP.concat(moderateP).concat(proP).concat(goatP);
        console.log(pool);
        }
      if(this.params.level == 'goat')
         {
           let easyP = []
           while(easyP.length < 1){
             let r = Math.floor(Math.random()*this.easy.length);
             if(easyP.indexOf(this.easy[r]) === -1) easyP.push(this.easy[r]);
           }

           let moderateP = []
           while(moderateP.length < 5){
             let r = Math.floor(Math.random()*this.moderate.length);
             if(moderateP.indexOf(this.moderate[r]) === -1) moderateP.push(this.moderate[r]);
           }

           let proP = []
           while(proP.length < 7){
             let r = Math.floor(Math.random()*this.pro.length);
             if(proP.indexOf(this.pro[r]) === -1) proP.push(this.pro[r]);
           }

           let goatP = []
           while(goatP.length < 17){
             let r = Math.floor(Math.random()*this.goat.length);
             if(goatP.indexOf(this.goat[r]) === -1) goatP.push(this.goat[r]);
           }

         pool = easyP.concat(moderateP).concat(proP).concat(goatP);
         console.log(pool);
         }
    console.log('======')
    console.log('raw:', this.rawtricks, this.rawtricks.length)
    console.log('pool:', pool, pool.length)
    this.rawtricks = this.rawtricks.concat(this.shuffle(pool));
    console.log(this.rawtricks, this.rawtricks.length)
    if(this.hasDuplicates(this.rawtricks))
      console.log('Atentie', this.rawtricks)
    console.log('======')
    this.tricks = this.rawtricks.slice(0,7);
    this.rawtricks = this.rawtricks.slice(7,this.rawtricks.length);
    // console.log(this.rawtricks);
 }

 shuffle(a){
   var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
 }

 addTrickToProfile(){
   var protricks = Number(this.profile.tricks) +1

   this.profile.tricks =protricks;
   // console.log(this.profile);
   this.profileService.updateProfile(this.userProfile.uid, this.profile as Profile)
 }
  hasDuplicates(array) {
     return (new Set(array)).size !== array.length;
   }
  updateList(trick){
    this.addTrickToProfile();
    if(this.hasDuplicates(this.tricks))
      console.log('Duplicates!!', this.tricks)
    this.tricks = this.tricks.filter(trick2=> trick2!=trick)
    // console.log(this.rawtricks[0], this.rawtricks.length)
    this.tricks.push(this.rawtricks[0]);
    this.rawtricks = this.rawtricks.slice(1, this.rawtricks.length);
    if(this.rawtricks.length == 0)
      this.makePool();
    // console.log(this.tricks)
  }

  ionViewDidLeave(){

    this.minutes = (Date.now() - this.startDate)/60000
    // console.log(this.minutes);
    var promins = Number(this.profile.minutes)
    promins += this.minutes;
    promins = Number(promins).toFixed(1);
    this.profile.minutes = promins
    this.profileService.updateProfile(this.userProfile.uid, this.profile as Profile)

  }

  // ionViewDidEnter(){
  //   console.log('did enter');
  //   this.startDate = Date.now();
  //
  //   this.params = this.paramsService.get();
  //   console.log(this.params);
  //
  //   this.trickService.getTricks().subscribe(tricks =>{
  //       console.log(tricks);
  //       tricks.forEach(trick=> {
  //         // console.log(trick);
  //         if(this.params.type == trick.type){
  //           if(Number(trick.score) < 3.9)
  //             this.easy.push(trick);
  //           if(Number(trick.score) >= 4 && Number(trick.score)<=5.9)
  //             this.moderate.push(trick);
  //           if(Number(trick.score) >= 6 && Number(trick.score)<=7.9)
  //             this.pro.push(trick);
  //           if(Number(trick.score) >= 8 && Number(trick.score)<=10.9)
  //             this.goat.push(trick);
  //           }
  //       })
  //     this.makePool();
  //     // console.log(this.easy, this.moderate, this.pro, this.goat)
  //     }
  //   );
  //   console.log('finished')
  // }
  ngOnInit() {
    console.log('did enter');
    this.startDate = Date.now();

    this.params = this.paramsService.get();
    console.log(this.params);
    console.log(this.trickService.getTricks());

    var myTricks = this.trickService.getTricks()
    myTricks.subscribe(tricks =>{
        console.log(tricks);
        tricks.forEach(trick=> {
          // console.log(trick);
          if(this.params.type == trick.type){
            if(Number(trick.score) < 3.9)
              this.easy.push(trick);
            if(Number(trick.score) >= 4 && Number(trick.score)<=5.9)
              this.moderate.push(trick);
            if(Number(trick.score) >= 6 && Number(trick.score)<=7.9)
              this.pro.push(trick);
            if(Number(trick.score) >= 8 && Number(trick.score)<=10.9)
              this.goat.push(trick);
            }
        })
      this.makePool();
      // console.log(this.easy, this.moderate, this.pro, this.goat)
      }
    );
    console.log('finished')
  }

  goToCompleted(){
    this.router.navigateByUrl('completed')
  }

  endSession(){
    // this.rawtricks = []
    // this.tricks = []

    this.router.navigateByUrl('profile');
  }

}
