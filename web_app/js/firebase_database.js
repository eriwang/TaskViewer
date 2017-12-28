"use strict";
//initialize firebase
var config = {
    apiKey: "AIzaSyBM1_eUTaTNg23tgHQDWK7Sro3gAh8r0a4",
    authDomain: "taskviewer-2e5c7.firebaseapp.com",
    databaseURL: "https://taskviewer-2e5c7.firebaseio.com/",
    projectId: "taskviewer-2e5c7",
    storageBucket: "taskviewer-2e5c7.appspot.com",
    messagingSenderId: "1015637164034"
  };
firebase.initializeApp(config);
var db = firebase.firestore();

//parameters for finishing task boolean
//parameters for checking whether #tasks reaches 100

//two separate collections:
//one for users and one for tasks.

//a parameter in the task will reference the user in question
//if it matches user, then it will read from that entry
$(document).ready(function(){
	$("#test-database").click(function(){
		console.log("hi");
		var color = document.getElementById("color").innerHTML;
		var desc = document.getElementById("description").innerHTML;
		var name = document.getElementById("name").innerHTML;
		var prio = document.getElementById("priority").innerHTML;
		var time = new Date();
		var user = document.getElementById("user").innerHTML;
		var task = new taskParameters(color, desc, name, prio, time, user);
		addItemToTasks(task);
	});
});
//class for the tasks
class taskParameters{
	constructor(color, desc, name, prio, timestamp, user){
		this.color = color;
		this.desc = desc;
		this.name = name;
		this.prio = prio;
		this.time = timestamp;
		this.user = user;
	}
}
var firebaseDatabase = (function(){
	//adds an item to the task
	function addItemToTasks(taskParameters){
		db.collection("tasks").add({
			color: taskParameters.color,
			description: taskParameters.desc,
			name: taskParameters.name,
			priority: taskParameters.prio,
			time: taskParameters.time,
			user: taskParameters.user
		})
		.then(function(docRef){
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(exception("Error adding document"));
	}

	//adds a user
	function addUser(user){
		db.collection("users").add({
			username: user
		})
		.then(function(docRef){
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(exception("Error adding document"));
	}

	//each item will be read from the database collection "tasks" for a specific "user"
	function readTasks(){
		db.collection("tasks").get().then(logAllQuerySnapshots);
	}

	//return each task related to a user
	function readTaskfromUser(user){
		var taskRef = db.collections("users");
		var query = taskRef.where("user", "==", user);
	}

	//reads individual docs from the database
	function readDoc(collection, docName){
		var docRef = db.collection(collection).doc(docName);
		docRef.get().then(function(doc){
			if(doc.exists){
				console.log("Document Data: ", doc.data());
			}
			else{
				console.log("No doc found");
			}
		})
		.catch(exception("Error getting doc"));
	}

	//updates a task from the database
	function updateTask(collection, docName, taskParameters){
		var taskRef = db.collection(collection).doc(docName);
		return taskRef.update({
			color: taskParameters.color,
			description: taskParameters.desc,
			name: taskParameters.name,
			priority: taskParameters.prio,
			time: taskParameters.time,
			user: taskParameters.user
		})
		.then(confirmation("Doc successfully updated."))
		.catch(exception("Error updating doc"));
	}

	//delete task
	function deleteTask(collection, docName){
		db.collection(collection).doc(docName).delete()
		.then(confirmation("Deleted task"))
		.catch(exception("Error removing document"));
	}

	//helper function to log queries
	function logAllQuerySnapshots(querySnapshot){
		querySnapshot.forEach((doc) => {
			console.log("${doc.id} => ${doc.data()}");
		});
	}

	//error helper
	function exception(error){
		console.error(error);
	}

	//confirmation (Can be scaled to do more) or add other helper functions
	function confirmation(message){
		console.log(message);
	}

	return{
		addItemToTasks: addItemToTasks,
		addUser: addUser,
		readTasks: readTasks,
		readTaskfromUser: readTaskfromUser,
		readDoc: readDoc,
		updateTask: updateTask,
		deleteTask: deleteTask
	};
});
