import firebase from "firebase";

// TODO: we need logout functionality
var firebaseAuth = (function() {
    var onAuthStateChangedUserSignedIn = null;
    var onAuthStateChangedUserNotSignedIn = null;
    var onError = null;

    function onAuthStateChanged(user) {
        const userIsSignedIn = (user != null);
        if (userIsSignedIn) {
            onAuthStateChangedUserSignedIn(user);
        }
        else {
            onAuthStateChangedUserNotSignedIn();
        }
    }

    function initialize(_onAuthStateChangedUserSignedIn, _onAuthStateChangedUserNotSignedIn, _onError) {
        onAuthStateChangedUserSignedIn = _onAuthStateChangedUserSignedIn;
        onAuthStateChangedUserNotSignedIn = _onAuthStateChangedUserNotSignedIn;
        onError = _onError;

        firebase.auth().onAuthStateChanged(onAuthStateChanged, onError);
    }

    return {
        initialize: initialize
    };
})();

export default firebaseAuth;
