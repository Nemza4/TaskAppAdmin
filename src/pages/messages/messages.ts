import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonalReviewPage } from '../personal-review/personal-review';
import { SortingClassMessage } from '../sortingClassMessage';
import { UpdatingField } from '../updating';
import { users } from '../../registeredUsers';
import { myAnswers } from '../gettingAnswers';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  declare var firebase;
@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  userAnwers : myAnswers;
  numberOfUsers = 0;
  objectSort : SortingClassMessage;

  registeredUsers : users;
  myUsers 
  displaySort
  filterData
  searchTerm

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    
      
  }

  ionViewDidLoad() {
    this.registeredUsers = new users();
    this.myUsers = this.registeredUsers.returningUsers();
    this.numberOfUsers = this.registeredUsers.numberOfUsers;
    this.objectSort = new SortingClassMessage(this.myUsers);
    this.displaySort = this.objectSort.newMessage;
    this.filterData = this.objectSort.newMessage;
  }
  
  review(name, surname, email, key ){
        var updates = {};

         
        updates['/registeredUsers/' +key+ '/checkPoint'] = 0;
        firebase.database().ref().update(updates);
        console.log(email)

        
        this.navCtrl.push("PersonalReviewPage",{name: name+'  '+surname, arr: email})
  }
  onInput(){

    this.filterData = this.displaySort.filter((user) => {
      return (user.name).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
    this.numberOfUsers = this.filterData.length;
    console.log(  )
  }

}
