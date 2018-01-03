import PropTypes from "prop-types";
import React from "react";

import Task from "../task.js";

// TODO: use state to manage deleting, editing, expanding, etc.
class TaskComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const task = this.props.task;

        return (
            <div>
                <p>Name: {task.name}</p>
                <p>Description: {task.description}</p>
                <p>Color: {task.color}</p>
                <p>Priority: {task.priority}</p>
                <p>Timestamp: {task.timestamp.toString()}</p>
            </div>
        );
    }
}

const TaskPropType = PropTypes.instanceOf(Task);

TaskComponent.propTypes = {
    task: TaskPropType.isRequired
};

export {TaskPropType as TaskPropType};
export default TaskComponent;
