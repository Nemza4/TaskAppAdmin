import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ComposeTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-compose-task',
  templateUrl: 'compose-task.html',
})
export class ComposeTaskPage {
  public form 	: FormGroup;
  public instruct 	: FormGroup;
  questions : boolean;

  timer : number;
  timerType : string;
  
  taskName : '';
  adminTask = [{
    question:'',
    questionType:'',
    answer:''
  }]
  instructionArray = []
  constructor(public navCtrl 		: NavController,
    public navParams 	: NavParams,
    private _FB          : FormBuilder){

      this.questions = true;

      this.form = this._FB.group({
        taskName       	  : ['', Validators.required],
        timer       	  : ['', Validators.required],
        timerType     	 : ['Seconds', Validators.required],
        qtype       	  : ['1', Validators.required],
        answer       	  : ['1', Validators.required],
        additional     : this._FB.array([
           this.initTechnologyFields()
        ])
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComposeTaskPage');
  }

  initTechnologyFields() : FormGroup
{
   return this._FB.group({
    question : ['', Validators.required],
      qtype       	  : ['1', Validators.required],
      answer       	  : ['', Validators.required]
   });
}

addNewInputField() : void
{
   const control = <FormArray>this.form.controls.additional;
   control.push(this.initTechnologyFields());
}



removeInputField(i : number) : void
{
   const control = <FormArray>this.form.controls.additional;
   control.removeAt(i);
}


manage(val : any) : void
   {
      console.dir(val.taskName);
      console.dir(val)
      
      this.taskName = val.taskName;
      this.timer = val.timer;
      this.timerType = val.timerType;
      val.additional.forEach(e => {
       
        this.adminTask.push({question: e.question, questionType: e.qtype, answer: e.answer})
      });

      this.questions = false;

      
   }


   cancel(){
      this.questions = true;
   }
   publish(){
      this.navCtrl.push("AnalyticsPage");
      this.uploadToFirebase();
   }

   uploadToFirebase(){

      var database = firebase.database();this.adminTask.forEach( e => {

        if( e.answer != "")
            database.ref('/'+this.taskName+'/').push(e);
      })

      database.ref('/tasks/').push({taskName : this.taskName, timer : this.timer, timerType: this.timerType });
   }

}
