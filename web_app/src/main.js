import $ from "jquery";
import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";

import AppComponent from "./components/app_component.js";

function initializeFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyBM1_eUTaTNg23tgHQDWK7Sro3gAh8r0a4",
        authDomain: "taskviewer-2e5c7.firebaseapp.com",
        databaseURL: "https://taskviewer-2e5c7.firebaseio.com/",
        projectId: "taskviewer-2e5c7",
        storageBucket: "taskviewer-2e5c7.appspot.com",
        messagingSenderId: "1015637164034"
    };
    firebase.initializeApp(firebaseConfig);
}

$(document).ready(function() {
	initializeFirebase();
	ReactDOM.render(<AppComponent />, document.getElementById("app"));
});
