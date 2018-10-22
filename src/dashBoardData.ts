declare var firebase;

export class dashBoard{
    task = []
    marks = [];
    marksObjArr = {};
    
    constructor(){
        firebase.database().ref('/tasks/').on("value", (snapshot)=>{
           
            snapshot.forEach((snap)=>{
                this.task.push(snap.val().taskName);
    
            })

            

            this.calculatingAverage();
        
         })


    }

    calculatingAverage(){
        var myTaskMarks = 0
        var testMarks;
        var averageMarks = [];


        
            
                console.log('xxxxxxxxxxx')
            firebase.database().ref('/My tasks answer/').on("value", (snapshot)=>{
                var count = 0;
                snapshot.forEach((snap)=>{

                   
                })
                
        })
        console.log(averageMarks)

        

    }

    returnData(){
        
    }

}