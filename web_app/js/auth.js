"use strict";

firebase.auth().onAuthStateChanged(
    function(user) {
        const userIsSignedIn = (user != null);
        if (userIsSignedIn) {
            console.log("user signed in");
        } 
        else {
            var firebaseUiConfig = {
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    signInSuccess: function(currentUser, credential) {
                        console.log("Login successful.");
                        return false; // do not automatically redirect
                    }
                },
                signInFlow: "popup",
                tosUrl: "www.google.com"
            };

            var firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
            firebaseUi.start("#firebaseui-auth-container", firebaseUiConfig);
        }
    },
    function(error) {
        console.log(error);
    }
);
