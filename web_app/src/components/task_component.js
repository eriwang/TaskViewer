import PropTypes from "prop-types";
import React from "react";

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

const TaskPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired
});

TaskComponent.propTypes = {
    task: TaskPropType.isRequired
};

export {TaskPropType as TaskPropType};
export default TaskComponent;
