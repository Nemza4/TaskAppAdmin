declare var firebase;

export class UpdatingField{

    message = ''
    constructor(  taskName: String, key : String , field : String ){
        this.update(taskName, key , field);
    }


    update(task, key, field){
        
        var updates = {};
            updates['/'+ task + '/' +key+ '/'+ field + ''] = 1;
            return firebase.database().ref().update(updates);

    }

    returnMessage(){
        return this.message;
    }
}