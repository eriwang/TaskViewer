import firebase from "firebase";
import firebaseui from "firebaseui";
import React from "react";

import firebaseAuth from "../firebase_auth.js";
import firebaseDatabase from "../firebase_database.js";

import TaskViewComponent from "./task_view_component.js";

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        firebaseAuth.initialize(
            this.onAuthStateChangedUserSignedIn.bind(this),
            this.onAuthStateChangedUserNotSignedIn.bind(this),
            this.onError.bind(this)
        );
    }

    onAuthStateChangedUserSignedIn(user) {
        console.log("user is signed in.");
    }

    onAuthStateChangedUserNotSignedIn() {
        console.log("user is not signed in.");

        var firebaseUiConfig = {
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
                signInSuccess: this.onSignInSuccess.bind(this)
            },
            signInFlow: "popup",
            tosUrl: "www.google.com"
        };

        var firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
        firebaseUi.start("#firebaseui-auth-container", firebaseUiConfig);
    }

    onSignInSuccess() {

    }

    onError(error) {
        // TODO
    }

    render() {
        return (
            <div>
                <h1>TaskViewer</h1>
                <TaskViewComponent />
                <div id="firebaseui-auth-container" />
            </div>
        );
    }
}

export default AppComponent;
