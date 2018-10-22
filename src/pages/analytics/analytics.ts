import { Component , AfterViewInit , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { dashBoard } from '../../dashBoardData';
import { myAnswers } from '../gettingAnswers';
import { users } from '../../registeredUsers';
import { ActionSheetController } from 'ionic-angular'


/**
 * Generated class for the AnalyticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase
@IonicPage()
@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html',
})
export class AnalyticsPage{
  LineChart 

  canvas: any;
  ctx: any;
  cardClicked = -1
  displayMarks : boolean;
  gettingRegisteredUsers : users;


  studentWroteTest = 0;
  dashBoardData : dashBoard;
  myData = []
  marks = 0
  averageMarks = [];
  averageMarksOnly = [];
  studentsWhoWroteTest = [];
  pieChartData = []
  highToLowMarks = []
  testMarks = 0
  countingTests = 0

  studentAndNames =[{
    taskName:'',
    studentName:''
  }]

  registeredUsersList = [{
    name:'',
    lastName:'',
    checkPoint:'',
    key:'',
    email:''
}]

  usersWhoCompletedTestObject : users;

  completedAnswersObject : myAnswers;

  usersWhoCompletedTestList 
  names = []

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public navParams: NavParams) {
      
    
  }


  ngOnInit() {

    this.completedAnswersObject = new myAnswers();
    this.usersWhoCompletedTestObject = new users();
    this.gettingRegisteredUsers = new users();

    
    this.usersWhoCompletedTestList = this.usersWhoCompletedTestObject.userNameAndMarks;
      
    console.log(this.usersWhoCompletedTestList)
    
    
      firebase.database().ref('/tasks/').on("value", (snapshot)=>{
           this.myData = [];
           this.averageMarksOnly = [];
           this.studentsWhoWroteTest = [];
        snapshot.forEach((snap)=>{
            this.myData.push(snap.val().taskName);
        })



        this.myData.forEach( e =>{

          firebase.database().ref('/My tasks answer/').on("value", (snapshot)=>{
           
            snapshot.forEach((snap)=>{
                if( snap.val().task === e && e !=''){
                  this.marks += snap.val().marks;
                  this.studentWroteTest +=1;
                  }
            })
            this.studentsWhoWroteTest.push( this.studentWroteTest);
            this.averageMarks.push( { testName: e, average: this.marks / this.studentWroteTest} )
            this.averageMarksOnly.push( this.marks / this.studentWroteTest );
            this.marks = 0;
            this.studentWroteTest = 0;
            


            this.countingTests +=1;

        })
      })

      console.log( this.averageMarks );
     console.log( this.averageMarksOnly )

     })

     


    firebase.database().ref('/registeredUsers/').on("value", (snapshot)=>{
          this.registeredUsersList = [];
          snapshot.forEach((snap)=>{
            
            this.registeredUsersList.push({name:snap.val().fname,lastName: snap.val().lname, checkPoint: snap.val().checkPoint, key: snap.key, email: snap.val().email })
          })
    })
    
    console.log(this.registeredUsersList)

    


                this.LineChart = new Chart( "lineChart",{
                  type: 'bar',
                  data: {
                    labels: this.myData,
                    datasets: [{
                      data :this.studentsWhoWroteTest,
                      fill: false,
                      lineTension: 0.1,
                      borderColor : "blue",
                      borderWidth: 1,
                      backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255 , 255, 0)',
                        'rgba(153, 50, 204)',
                        'rgba(0, 139, 139)',
                        'rgba(139, 0, 0)'
                                    ],
                    }]
                  },
                  options: {
                    responsive: true,
                    title:{
                      text: "CodeTribers who completed a task",
                      display : true
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                          beginAtZero: true
                        }
                      }]
                    }
                  }
                
              })

            




    let myChart = new Chart( 'pieChart' , {
      type: 'pie',
      data: {
          labels: this.myData,
          datasets: [{
              label: '# of Votes',
              data: this.averageMarksOnly,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255 , 255, 0)',
                'rgba(153, 50, 204)',
                'rgba(0, 139, 139)',
                'rgba(139, 0, 0)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        title:{
          text: "Tests average",
          display : true
        },
      }
    });

  }



  ngAfterViewInit() {

      firebase.database().ref('/tasks/').on("value", (snapshot)=>{
        this.names = []
    snapshot.forEach((snap)=>{
        this.names.push(snap.val().taskName);
    })
  })
   

  }

  displaySampleMarks(i){
    this.cardClicked = i;
    console.log(this.cardClicked)
  }
  
  presentActionSheet(myTest) {
    console.log(myTest)
    var test = myTest;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Re-take '+test,
          handler: () => {
            this.navCtrl.push("RetakePage",{ testName : test})
            
          }
        },
        {
          text: 'Delete '+test,
          role: 'destructive',
          handler: () => {

            firebase.database().ref('/'+test+ '/').remove();

            firebase.database().ref('/tasks/').on("value", (snapshot)=>{
          
              snapshot.forEach((snap)=>{
                
                 if ( snap.val().taskName === test ){

                      return firebase.database().ref('/tasks/' +snap.key+ '/').remove();

                 }
                 
              })
              test = ''
            })

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
}
