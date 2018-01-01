import firebase from "firebase";
import firebaseui from "firebaseui";
import React from "react";

import firebaseAuth from "../firebase_auth.js";
import firebaseDatabase from "../firebase_database.js";

import TaskViewComponent from "./task_view_component.js";

const AppViews = Object.freeze({
    TITLE: Symbol("title"),
    TASK: Symbol("task")
});

const LOADING_JSX = <h1>Loading...</h1>;
const TITLE_JSX = (
    <div>
        <h1>TaskViewer (Title Page)</h1>
        <div id="firebaseui-auth-container" />
    </div>
);

/*
TODO: Firebase DB requires the following callbacks
- onTaskDataReceived(taskData)
    - rerender the view with task data
    - should be called after query successful
*/

// TODO: helper class? one for callbacks maybe
class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            view: AppViews.TITLE
        };

        firebaseAuth.setCallbacks(
            this.onAuthStateChangedUserSignedIn.bind(this),
            this.onAuthStateChangedUserNotSignedIn.bind(this),
            this.onError.bind(this)
        );
        firebaseDatabase.setCallbacks(
            this.onTaskDataReceived.bind(this),
            this.onError.bind(this)
        );

        this.tasksInView = []; // TODO: think of a better solution
    }

    onAuthStateChangedUserSignedIn(user) {
        this.switchToTaskViewForUser(user);
    }

    onAuthStateChangedUserNotSignedIn() {
        console.log("user is not signed in.");
        this.stopLoadingAppView();
    }

    onSignInSuccess(user, credential, redirectUrl) {
        this.switchToTaskViewForUser(user);
    }

    onTaskDataReceived(taskData) {
        console.log(taskData);
    }

    onError(error) {
        // TODO
    }

    beginLoadingAppView(appView) {
        this.setState({
            loading: true,
            view: appView
        });
    }

    // TODO: better name
    // TODO: make correct with db calls instead of placeholder
    switchToTaskViewForUser(user) {
        this.beginLoadingAppView(AppViews.TASK);
        firebaseDatabase.readTasks();
        // TODO: call db for tasks
        return;
        setTimeout(() => {
            this.tasksInView = [0, 1, 2, 3].map((index) => {
                return {
                    name: "Test task",
                    description: "Task for testing",
                    color: 6,
                    priority: 1,
                    timestamp: new Date()
                };
            });
            this.stopLoadingAppView();
        }, 2000);
    }

    stopLoadingAppView() {
        this.setState({loading: false});
    }

    componentDidUpdate() {
        if (this.state.view == AppViews.TITLE) {
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
    }

    render() {
        if (this.state.loading) {
            return LOADING_JSX;
        }

        switch (this.state.view) {
            case AppViews.TITLE:
                return TITLE_JSX;
            case AppViews.TASK:
                return (
                    <div>
                        <h1>TaskViewer (Task Page)</h1>
                        <TaskViewComponent tasks={this.tasksInView} />
                        <button onClick={this.changeTasks}>Click me!</button>
                    </div>
                );
        }

        return (
            <h1>ERROR</h1>
        );
    }
}

export default AppComponent;
