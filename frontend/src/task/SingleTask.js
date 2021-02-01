import React, { Component } from 'react';
import {singleTask} from './apiTask'
import {isAuthenticated} from '../auth'

class SingleTask extends Component {
    state = {
        task: '',
    }
    componentDidMount = () => {
        const taskId = this.props.match.params.taskId
        const token = isAuthenticated().token
        singleTask(token, taskId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({task: data})
            }
        })
    }
    
    render() {
        return (
            <div>
                <h2>Single Post</h2>
                {this.props.match.params.taskId}
                {JSON.stringify(this.state.task)}
            </div>
        );
    }
}

export default SingleTask;
