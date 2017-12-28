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
	changeColor(color){
		this.color = color;
	}
	changeDesc(desc){
		this.desc = desc;
	}
	changeName(name){
		this.name = name;
	}
	changePrio(prio){
		this.prio = prio;
	}
	changeTimestsamp(timestamp){
		this.time = timestamp;
	}
	changeUser(user){
		this.user = user;
	}
}
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
	.catch(function(error){
		console.error("Error adding document: ", error);
	});
}

//adds a user
function addUser(user){
	db.collection("users").add({
		username: user
	})
	.then(function(docRef){
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error){
		console.error("Error adding document: ", error);
	});
}
//read each user
function readUserFromDatabase(){
	db.collection("users").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				//code to manipulate files
				console.log("${doc.id} => ${doc.data()}");
			});
	});
}

//each item will be read from the database collection "tasks" for a specific "user"
function readTasksFromDatabase(){
	var taskRef = db.collection("tasks");
	db.collection("tasks").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				//code to manipulate files

				console.log("${doc.id} => ${doc.data()}");
			});
	});
}

//return each task related to a user
function readTaskfromUser(user){
	var taskRef = db.collections("users");
	var query = taskRef.where("user", "==", user);
}

//reads individual docs from the database
function readDocFromDatabase(collection, docName){
	var docRef = db.collection(collection).doc(docName);
	docRef.get().then(function(doc){
		if(doc.exists){
			console.log("Document Data: ", doc.data());
		}
		else{
			console.log("No doc found");
		}
	}).catch(function(error){
		console.log("Error getting doc: ", error);
	});
}

//updates a task from the database
function updateTaskFromDatabase(collection, docName, taskParameters){
	var taskRef = db.collection(collection).doc(docName);
	return taskRef.update({
		color: taskParameters.color,
		description: taskParameters.desc,
		name: taskParameters.name,
		priority: taskParameters.prio,
		time: taskParameters.time,
		user: taskParameters.user
	})
	.then(function(){
		console.log("Doc successfully updated.");
	})
	.catch(function(error){
		console.error("Error updating doc: ", error);
	});
}

//delete task
function deleteTaskFromDatabase(collection, docName){
	db.collection(collection).doc(docName).delete().then(function(){
		console.log("Deleted task");
	}).catch(function(error){
		console.error("Error removing document: ", error);
	});
}

