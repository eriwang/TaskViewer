import React from "react";

// TODO: move to use as shared class for db, may need an adaptor for prototype
function Task(name, description, color, priority, time) {
    return {
        name: name,
        description: description,
        color: color,
        priority: priority,
        time: time
    };
}

// TODO: revisit method names
class TaskViewComponent extends React.Component {
    constructor(props) {
        super(props);
        // this._isReady = true; // TODO: better name?
        this.state = {tasks: []};
    }

    setTasks(tasks) {
        // FIXME: race conditions
        this.setState({
            tasks: []
        });
        setTimeout(() => {
            this.setState({
                tasks: tasks
            });
        }, 500);
    }

    render() {
        console.log(this.state);
        const taskComponents = this.state.tasks.map((task) => {<TaskComponent/>;});

        return (
            <div>{taskComponents}</div>
        );
    }
}

class TaskComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    // TODO: name, description, color, priority, time
    render() {
        return (
            <div>
                Some task
            </div>
        );
    }
}

export default TaskViewComponent;
