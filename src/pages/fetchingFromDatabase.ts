declare var firebase;

export class FetchDataFromDatabase{

    constructor( ableName : String){

    }

    fetch(){
        firebase.database().ref('/My tasks answer/').on("value", (snapshot)=>{
           
            snapshot.forEach((snap)=>{
              
            })
        
         })
    }
}


/*


firebase.database().ref('/My tasks answer/').on("value", (snapshot)=>{
      this.firebaseName = [];
      this.numberOfUsers = 0;
      snapshot.forEach((snap)=>{
        this.numberOfUsers +=1;
        this.firebaseName.push({name:snap.val().name, message:snap.val().message,marks : snap.val().marks,
                            checkPoint: snap.val().checkPoint, rate:'', key : snap.key})
      })
    
  })
*/