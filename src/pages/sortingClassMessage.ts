export class SortingClassMessage{
    myArray ;

    newMessage = []
    openedMessage = []
    constructor( dataArray : any){
            this.myArray = dataArray;
            this.display();
    }

    display(){
        this.myArray.forEach(e => {
            console.log(e.checkPoint)
            if(e.checkPoint == 1)
                this.newMessage.push(e);
             else
                this.openedMessage.push(e);
        });

        this.arrange()
    }

    arrange(){
        this.openedMessage.forEach(e => {
            this.newMessage.push(e)
        })

        return this.newMessage;
    }
}