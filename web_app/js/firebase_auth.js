"use strict";

var firebase = require("firebase");
var firebaseui = require("firebaseui");

// TODO: we need logout functionality
var firebaseAuth = (function() {
    // TODO: var callback = uiController.function;

    function onAuthStateChanged(user) {
        const userIsSignedIn = (user != null);
        if (userIsSignedIn) {
            onAuthStateChangedUserSignedIn(user);
        }
        else {
            onAuthStateChangedUserNotSignedIn();
        }
    }

    function onAuthStateChangedUserSignedIn(user) {
        console.log("user is signed in.");
        // TODO: UI class callback
    }

    function onAuthStateChangedUserNotSignedIn() {
        console.log("user is not signed in.");

        var firebaseUiConfig = {
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
                signInSuccess: onSignInSuccess
            },
            signInFlow: "popup",
            tosUrl: "www.google.com"
        };

        // TODO: UI class callback
        var firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
        firebaseUi.start("#firebaseui-auth-container", firebaseUiConfig);
    }

    function onAuthStateChangedError(error) {
        // TODO: UI class error callback??
        console.error(error);
    }

    function onSignInSuccess(user, credentials) {
        console.log("sign in successful.");
        // TODO: UI class callback
        return false; // do not automatically redirect
    }

    function start() {
        firebase.auth().onAuthStateChanged(onAuthStateChanged, onAuthStateChangedError);
    }

    return {
        start: start
    };
})();

module.exports = firebaseAuth;