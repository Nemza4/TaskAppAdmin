import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ComposeTaskPage } from '../pages/compose-task/compose-task'
import {AnalyticsPage } from '../pages/analytics/analytics' 
import { HomePage } from '../pages/home/home';
import { MessagesPage } from '../pages/messages/messages';
import { UsersPage } from '../pages/users/users';

declare var firebase;
@Component({
  templateUrl: 'app.html'
})



export class MyApp {

  
  @ViewChild(Nav) nav;
   rootPage:any = "AnalyticsPage";

   logIn : boolean;
   Username = '';
   Password = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.logIn = false;
  }

  page(pageName){
    console.log("page clicked...")
    console.log(pageName)
    switch(pageName){
      
      case 'analytics':
        this.nav.setRoot("AnalyticsPage")
        break;
      case 'mail':
        this.nav.setRoot("MessagesPage");
        break;
      case 'add':
        this.nav.setRoot("ComposeTaskPage")
        break;
    }
  }


  logInAdmin(){
  
    this.logIn = true

     console.log( this.Username +"  "+ this.Password)
      // fire.auth().createUserWithEmailAndPassword( this.Username, this.Password).then(User =>{
      
      //   if( this.Username === 'Andani@g.com' )
      //       this.logIn = true
    
      // }).catch((error)=> {
        
      // });
  }
}

