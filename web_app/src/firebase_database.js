require("firebase/firestore");

import Task from "./task.js";

// FIXME: pretty sure helpers can be used in many different areas
// FIXME: many comments are useless (just repeating the function/ class name)
// FIXME: We can use promises instead of passing in callbacks

// parameters for finishing task boolean
// parameters for checking whether #tasks reaches 100

// two separate collections:
// one for users and one for tasks.

// a parameter in the task will reference the user in question
// if it matches user, then it will read from that entry

// FIXME: verify all functions work as expected with task class
var firebaseDatabase = (function() {
    var db = null;

    var onError = null;

    function addTask(task) {
        db.collection("tasks").add(task.toObject())
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
    function readTasks() {
        return db.collection("tasks").get().then(function(querySnapshot) {
            const tasks = querySnapshot.docs.map((documentSnapshot) => {
                var taskData = documentSnapshot.data();

                return new Task(taskData.name, taskData.description, taskData.timestamp, taskData.color,
                    taskData.priority);
            });

            return tasks;
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

    // FIXME: update this function to work correctly with the Task class
    // updates a task from the database
    function updateTask(collection, docName, task) {
        var taskRef = db.collection(collection).doc(docName);
        taskRef.update(task.toObject())
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
        addTask: addTask,
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
