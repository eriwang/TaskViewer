import PropTypes from "prop-types";
import React from "react";

import TaskComponent, {TaskPropType} from "./task_component.js";

class TaskViewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const taskComponents = this.props.tasks.map((task, index) => {
                return <TaskComponent key={index} task={task}/>;
            }
        );

        return (
            <div>{taskComponents}</div>
        );
    }
}

TaskViewComponent.propTypes = {
    tasks: PropTypes.arrayOf(TaskPropType).isRequired
};

export default TaskViewComponent;
