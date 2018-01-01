require("firebase/firestore");

// FIXME: pretty sure helpers can be used in many different areas
// FIXME: many comments are useless (just repeating the function/ class name)

// parameters for finishing task boolean
// parameters for checking whether #tasks reaches 100

// two separate collections:
// one for users and one for tasks.

// a parameter in the task will reference the user in question
// if it matches user, then it will read from that entry

// class for the tasks
class taskParameters {
    constructor(color, desc, name, prio, timestamp, user) {
        this.color = color;
        this.desc = desc;
        this.name = name;
        this.prio = prio;
        this.time = timestamp;
        this.user = user;
    }
}

var firebaseDatabase = (function() {
    var db = null;

    var onError = null;

    // adds an item to the task
    function addItemToTasks(taskParameters) {
        db.collection("tasks").add({
            color: taskParameters.color,
            description: taskParameters.desc,
            name: taskParameters.name,
            priority: taskParameters.prio,
            time: taskParameters.time,
            user: taskParameters.user
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(onError);
    }

    // adds a user
    function addUser(user) {
        db.collection("users").add({
            username: user
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(onError);
    }

    // each item will be read from the database collection "tasks" for a specific "user"
    function readTasks(onTaskDataReceived) {
        db.collection("tasks").get().then(function(querySnapshot) {
            var tasks = querySnapshot.docs.map((documentSnapshot) => {
                // TODO: id??
                return documentSnapshot.data();
            });
            onTaskDataReceived(tasks);
        });
    }

    // return each task related to a user
    function readTaskfromUser(user) {
        var taskRef = db.collections("users");
        var query = taskRef.where("user", "==", user);
    }

    // reads individual docs from the database
    function readDoc(collection, docName) {
        var docRef = db.collection(collection).doc(docName);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document Data: ", doc.data());
            }
            else{
                console.log("No doc found");
            }
        })
        .catch(onError);
    }

    // updates a task from the database
    function updateTask(collection, docName, taskParameters) {
        var taskRef = db.collection(collection).doc(docName);
        taskRef.update({
            color: taskParameters.color,
            description: taskParameters.desc,
            name: taskParameters.name,
            priority: taskParameters.prio,
            time: taskParameters.time,
            user: taskParameters.user
        })
        .then(function(){confirmation("Doc successfully updated.");})
        .catch(onError);
    }

    // delete task
    function deleteTask(collection, docName) {
        db.collection(collection).doc(docName).delete()
        .then(function(){confirmation("Deleted task");})
        .catch(onError);
    }

    // confirmation (Can be scaled to do more) or add other helper functions
    function confirmation(message) {
        console.log(message);
    }

    function initialize(firebase) {
        db = firebase.firestore();
    }

    function setCallbacks(_onError) {
        onError = _onError;
    }

    return {
        addItemToTasks: addItemToTasks,
        addUser: addUser,
        readTasks: readTasks,
        readTaskfromUser: readTaskfromUser,
        readDoc: readDoc,
        updateTask: updateTask,
        deleteTask: deleteTask,
        initialize: initialize,
        setCallbacks: setCallbacks
    };
})();

export default firebaseDatabase;
