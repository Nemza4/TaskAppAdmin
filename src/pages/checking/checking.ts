import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SortingClassMessage } from '../sortingClassMessage';

/**
 * Generated class for the CheckingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-checking',
  templateUrl: 'checking.html',
})
export class CheckingPage {
  public form 	: FormGroup;
  questions : boolean;
  
  taskName : '';
  adminTask = [{
    question:'',
    questionType:''
  }]

  checkPoint : number;
  object : SortingClassMessage;
  counter = 6;
  i
  constructor(public navCtrl 		: NavController,
    public navParams 	: NavParams,
    private _FB          : FormBuilder){

      this.questions = true;
      this.checkPoint = 0;
      

      firebase.database().ref('/My first task/').on("value", (snapshot) =>{
        snapshot.forEach(e => {

          console.log(e.val())
          this.counter += 1;
          this.adminTask.push({question: e.val().question, questionType: e.val().questionType})
        });
      })/// <reference path="" />
      
      
      this.form = this._FB.group({
        additional     : this._FB.array([
           this.initTechnologyFields()
        ])
     });

     for( this.i = 0; this.i < this.counter ; ++this.i){
       this.addNewInputField();
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComposeTaskPage');
  }

  initTechnologyFields() : FormGroup
{
   return this._FB.group({
      answer       	  : ['', Validators.required]
   });
}

addNewInputField() : void
{
   const control = <FormArray>this.form.controls.additional;
   control.push(this.initTechnologyFields());
}


manage(val : any) : void // on rating page....
   {
      console.dir(val);
      console.log(this.counter)


      var database = firebase.database();

        database.ref('/My tasks answer/').push({name : 'Fressy M',message : 'It was a fair task', 
        marks: 5,rate:'3' , checkPoint : this.checkPoint});
      
      
   }
}
``