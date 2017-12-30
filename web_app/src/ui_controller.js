




var uiController = (function() {
    var appComponent = <AppComponent onClick={setTasks}/>;
    var taskViewComponent = <TaskViewComponent />;

    function setTasks() {
        taskViewComponent.setTasks([
            {
            }
        ]);
    }

    function start() {
        
        appComponent.setViewComponent(taskViewComponent);
        
    }

    return {
        start: start
    };
})();

export default uiController;
