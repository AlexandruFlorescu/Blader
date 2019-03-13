import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Facebook } from '@ionic-native/facebook/ngx';
// import { GooglePlus } from '@ionic-native/google-plus/npx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { ProfileService } from './services/profile.service';
import { TrickService } from './services/tricks.service';
import { HttpClientModule } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyD7nTXcHWQERPSMl5SpOFx5ONQw0iMxI9M",
    authDomain: "betterblader-8500b.firebaseapp.com",
    databaseURL: "https://betterblader-8500b.firebaseio.com",
    projectId: "betterblader-8500b",
    storageBucket: "betterblader-8500b.appspot.com",
    messagingSenderId: "870585135693"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    ProfileService,
    TrickService,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
