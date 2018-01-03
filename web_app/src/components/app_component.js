import firebase from "firebase";
import firebaseui from "firebaseui";
import React from "react";

import firebaseAuth from "../firebase_auth.js";
import firebaseDatabase from "../firebase_database.js";
import tasksInView from "../tasks_in_view.js";

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

        this.stopLoadingAppView = this.stopLoadingAppView.bind(this);
    }

    onAuthStateChangedUserSignedIn(user) {
        this.loadInitialTaskView(user);
    }

    onAuthStateChangedUserNotSignedIn() {
        console.log("user is not signed in.");
        this.stopLoadingAppView();
    }

    onSignInSuccess(user, credential, redirectUrl) {
        this.loadInitialTaskView(user);
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
        console.log("loading complete.");
        this.setState({loading: false});
    }

    // TODO: better name
    loadInitialTaskView(user) {
        this.beginLoadingAppView(AppViews.TASK);
        tasksInView.syncWithDatabase().then(this.stopLoadingAppView);
    }

    // TODO: manage this with state instead
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
                        <TaskViewComponent tasks={tasksInView.getShownTasks()} />
                    </div>
                );
        }

        return (
            <h1>ERROR</h1>
        );
    }
}

export default AppComponent;
