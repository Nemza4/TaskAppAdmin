
declare var firebase;

export class users{

    numberOfUsers

    users  = [{
        name:'',
        lastName:'',
        checkPoint:'',
        key:'',
        email:''
    }]

    usersWhoCompletedTasks = [{
        email:'',
        marks:'',
        testName:''
    }]

    userNameAndMarks = [{
        firstName:'',
        lastName:'',
        marks: '',
        testName:'',
        email:''
    }]

    userAndHisTask = [{
        firstName:'',
        lastName:'',
        testName:''
    }]
    constructor(){
        firebase.database().ref('/registeredUsers/').on("value", (snapshot)=>{
              this.users = []
              this.numberOfUsers = 0;
              snapshot.forEach((snap)=>{
                this.numberOfUsers +=1;
                
                if( snap.val().fname != null )
                    this.users.push({name:snap.val().fname,lastName: snap.val().lname, checkPoint: snap.val().checkPoint, key: snap.key, email: snap.val().email })
              })
              console.log("lllllll"+this.users)
              this.gettingUserNameAndTestAnwered()
              this.returningUsers();
        })
    }

    returningUsers(){
        return this.users;
    }

    gettingUserNameAndTestAnwered(){

        firebase.database().ref('/My tasks answer/').on("value", (snapshot)=>{
            
            snapshot.forEach((snap)=>{
              
              this.usersWhoCompletedTasks.push({email: snap.val().email, marks: snap.val().marks,
                                    testName:snap.val().task})
            })

            
      
            this.assginingNames();
      })


      console.log(this.usersWhoCompletedTasks)
    }

    assginingNames(){


        this.usersWhoCompletedTasks.forEach( e =>{

            this.users.forEach( registered =>{
                if ( registered.email === e.email){
                    this.userNameAndMarks.push({firstName: registered.name, lastName: registered.lastName, 
                        marks: e.marks, testName: e.testName, email: e.email})
                }
            })
        })
        console.log(this.userNameAndMarks)

        return this.userNameAndMarks;
    }

    aUserAndTheTaskTheyTook(){

        // this.users.forEach( user =>{

        //     this.usersWhoCompletedTasks.forEach( myTask =>{
        //             if( user.email === myTask.email ){
        //                 this.userAndHisTask.push({firstName: user.name, lastName})
        //             }
        //     })
        // })

    }
}