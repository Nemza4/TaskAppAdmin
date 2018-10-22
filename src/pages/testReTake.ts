declare var firebase;

export class reTakeTest{

    
    constructor(  taskName: String, key : String ){
        this.update(taskName, key );
    }


    update(task, key){
        var updates = {};
            updates['/'+ task + '/' +key+ '/'] = 1;
            return firebase.database().ref().update(updates);

    }
}