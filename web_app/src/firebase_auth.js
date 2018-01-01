// TODO: we need logout functionality
var firebaseAuth = (function() {
    var auth = null;

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

    function initialize(firebase) {
        auth = firebase.auth();
    }

    function setCallbacks(_onAuthStateChangedUserSignedIn, _onAuthStateChangedUserNotSignedIn, _onError) {
        onAuthStateChangedUserSignedIn = _onAuthStateChangedUserSignedIn;
        onAuthStateChangedUserNotSignedIn = _onAuthStateChangedUserNotSignedIn;
        onError = _onError;

        auth.onAuthStateChanged(onAuthStateChanged, onError);
    }

    return {
        initialize: initialize,
        setCallbacks: setCallbacks
    };
})();

export default firebaseAuth;
