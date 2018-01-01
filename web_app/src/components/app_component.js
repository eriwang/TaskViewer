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
            this.onError.bind(this)
        );

        this.tasksInView = []; // TODO: think of a better solution
    }

    onAuthStateChangedUserSignedIn(user) {
        this.refreshTaskView(user);
    }

    onAuthStateChangedUserNotSignedIn() {
        console.log("user is not signed in.");
        this.stopLoadingAppView();
    }

    onSignInSuccess(user, credential, redirectUrl) {
        this.refreshTaskView(user);
    }

    onTaskDataReceived(taskData) {
        this.tasksInView = taskData;
        this.stopLoadingAppView();
    }

    onError(error) {
        // TODO
        console.error(error);
    }

    beginLoadingAppView(appView) {
        this.setState({
            loading: true,
            view: appView
        });
    }

    stopLoadingAppView() {
        this.setState({loading: false});
    }

    // TODO: better name
    refreshTaskView(user) {
        this.beginLoadingAppView(AppViews.TASK);
        firebaseDatabase.readTasks(this.onTaskDataReceived.bind(this));
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
