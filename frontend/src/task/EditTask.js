import React, { Component } from 'react';

class EditTask extends Component {
    render() {
        return (
            <div>
                <h2>Edit Task</h2>
                {this.props.match.params.taskId}
            </div>
        );
    }
}

export default EditTask;
