
declare var firebase;

export class userNames{

    usersNames = [{
        name:'',
        surname:'',
        email:'',
        }]
    usersMessages = [{
        name:'',
        surname:'',
        checkPoint:'',
        key:''
    }]

    myArray

    constructor(){

        firebase.database().ref('/registeredUsers/').on("value", (snapshot)=>{
            this.usersNames = [];

            snapshot.forEach((snap)=>{

              this.usersNames.push({name:snap.val().fname, surname: snap.val().lname, email: snap.val().email})
            })
        })
    }

    recieveEmail( emails){
        this.myArray = emails;
    }

    gettingNames(){
        var i = 0;
        this.myArray.forEach(e => {
            
            for( i = 0; i < userNames.length; i++){
                if(e.email === this.usersNames[i].email){
                    this.usersMessages.push({name:this.usersNames[i].name, surname:this.usersNames[i].surname,checkPoint: e.checkPoint, key : e.key})
                }
            }
        });
    }

    returningUsers(){
        return this.usersMessages;
    }
}