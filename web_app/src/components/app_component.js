import firebase from "firebase";
import firebaseui from "firebaseui";
import React from "react";

import firebaseAuth from "../firebase_auth.js";
import firebaseDatabase from "../firebase_database.js";

import TaskViewComponent from "./task_view_component.js";

var getAndIncrement = function() {
    var value = 0;
    return function () {
        value += 1;
        return value;
    };
}();

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tasks: []};

        firebaseAuth.initialize(
            this.onAuthStateChangedUserSignedIn.bind(this),
            this.onAuthStateChangedUserNotSignedIn.bind(this),
            this.onError.bind(this)
        );

        this.changeTasks = this.changeTasks.bind(this);
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

    changeTasks() {
        const tasks = [0, 1, 2, 3].map((index) => {
            const counter = getAndIncrement();
            return {
                name: `Test task ${counter}`,
                description: `Task ${counter} for testing`,
                color: 6,
                priority: 1,
                timestamp: new Date()
            };
        });

        this.setState({
            tasks: tasks
        });
    }

    render() {
        return (
            <div>
                <h1>TaskViewer</h1>
                <TaskViewComponent tasks={this.state.tasks} />
                <div id="firebaseui-auth-container" />
                <button id="btn" onClick={this.changeTasks}>Click me</button>
            </div>
        );
    }
}

export default AppComponent;
