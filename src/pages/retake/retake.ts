import { Component ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UpdatingField } from '../updating';
import { reTakeTest } from '../testReTake';



declare var firebase
@IonicPage()
@Component({
  selector: 'page-retake',
  templateUrl: 'retake.html',
})
export class RetakePage {
  testToRetake = ''
  email = ''
  UID = ''
  testName=''
  message = ''
  taskAvailabilityMessage =''
  updateTest : UpdatingField;
  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public navParams: NavParams) {
  
    var auth = firebase.auth().currentUser;
    this.testToRetake = navParams.get("testName")
  
    console.log(auth)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RetakePage');
  }

  reTake(){
    firebase.database().ref('/registeredUsers/').on("value", (snapshot)=>{
           
      snapshot.forEach((snap)=>{


        
           if( snap.val().email === this.email ){
             console.log( snap.val().email + "  "+ this.email)
              this.UID = snap.val().userId;
              
           }
              
      })

      
      var myNode = this.UID;
      

      firebase.database().ref('/'+this.UID+'/').once("value", (snapshot)=>{
           
        console.log("hhhhhh")
        snapshot.forEach((snap)=>{

          console.log(myNode)
          if( snap.val().taskName === this.testToRetake ){
             this.message = new UpdatingField(myNode,snap.key,"taskName").returnMessage();
              this.testToRetake = '';
          }
              
          
        })

            myNode = ''
          if( this.testToRetake === '' ){

            this.taskAvailabilityMessage = 'Task is now available';
            
          }else{

            this.taskAvailabilityMessage = 'The User has not opened such task'
          }

            let actionSheet = this.actionSheetCtrl.create({
              title: this.taskAvailabilityMessage,
              buttons: [
                
                {
                  text: 'OK!',
                  handler: () => {
                    
                  }
                }
              ]
            });
        
            actionSheet.present();
      })

      
      })

      return;


   
   
  }


  
}
