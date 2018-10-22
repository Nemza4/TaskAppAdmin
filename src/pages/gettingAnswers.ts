declare var firebase;

export class myAnswers{

    answers= [{
        marks:'',
        taskName:'',
        message:'',
        rating:''
    }]

    completedTask =[{
        taskName:'',
        
    }]

    constructor(){
        
    }

    returnAnswers(myEmail){
        
        firebase.database().ref('/My tasks answer/').on("value", (snapshot)=>{
            
            this.answers = []

            snapshot.forEach((snap)=>{

                console.log('  '+snap.val().marks)
                   if(snap.val().email == myEmail)
                    this.answers.push({marks:snap.val().marks, taskName:snap.val().task,message : snap.val().message,rating : snap.val().rating})
            })
            
        })

        return this.answers;
    }

    answeredTask(){

        firebase.database().ref('/My tasks answer/').on("value", (snapshot)=>{
            

            snapshot.forEach((snap)=>{

                console.log('  '+snap.val().marks)
                    this.answers.push({marks:snap.val().marks, taskName:snap.val().task,message : snap.val().message,rating : snap.val().rating})
            })
            
        })

        return this.answers;
    }
}