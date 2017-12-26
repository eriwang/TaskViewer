console.log("hello world!");
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
//initialize firestore
const firebase = require("firebase");
require("firebase/firestore");

var db = firebase.firestore();
var firstName = "Test1";
var lastName = "Test2";
var dateOfBirth = 1000;

//parameters for finishing task boolean
//parameters for checking whether #tasks reaches 100

//two separate collections:
//one for users and one for tasks.

//a parameter in the task will reference the user in question
//if it matches user, then it will read from that entry

//adds an item to the task
function addItemToTasks(){
	db.collection("tasks").add({
		first: firstName,
		last: lastName,
		born: dateOfBirth
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
//each item will be read from the database collection "user"
function readItemFromDatabase(){
	db.collection("users").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log('${doc.id} => ${doc.data()}');
			});
	});
}

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

var userRef = db.collection('users').doc(docRef.id);
var mergeItem = userRef.set({
	first: firstName
}, {merge: true});