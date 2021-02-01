import React, { Component } from 'react';

class SingleTask extends Component {
    render() {
        return (
            <div>
                <h2>Single Post</h2>
                {this.props.match.params.taskId}
            </div>
        );
    }
}

export default SingleTask;
