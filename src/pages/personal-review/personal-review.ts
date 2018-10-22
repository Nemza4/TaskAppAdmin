import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UpdatingField } from '../updating';
import { myAnswers } from '../gettingAnswers';

/**
 * Generated class for the PersonalReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-review',
  templateUrl: 'personal-review.html',
})
export class PersonalReviewPage {
  objectUpdate : UpdatingField;
  objectAnswer : myAnswers;
  name : String;
  email
  myAnwerArray
  arrData
  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.name = navParams.get("name");
      this.email = navParams.get("arr");
      console.log(this.email)


      this.objectAnswer = new myAnswers();
        this.arrData= this.objectAnswer.returnAnswers(this.email)
        
      //this.myAnwerArray = this.objectAnswer.returnAnswers();
  }

  backButton(){

    this.navCtrl.push("MessagesPage")
  }
  

}
