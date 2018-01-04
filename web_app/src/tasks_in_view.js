import firebaseDatabase from "./firebase_database.js";

// TODO: filtering, sorting, searching views
var tasksInView = (function() {
    var allTasks = [];
    var shownTasks = [];

    function getShownTasks() {
        return shownTasks;
    }

    function syncWithDatabase() {
        return firebaseDatabase.readTasks().then((tasks) => {
            allTasks = tasks;
            shownTasks = allTasks; // TODO: do we want this??
        });
    }

    return {
        getShownTasks: getShownTasks,
        syncWithDatabase: syncWithDatabase
    };
})();

export default tasksInView;
