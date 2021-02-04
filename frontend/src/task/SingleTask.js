import React, { Component } from 'react';
import {singleTask} from './apiTask'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

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

    renderTask = (task) => {
        const submitterFirstName = task.submittedBy ? task.submittedBy.firstName : "N/A"
        const submitterLastName = task.submittedBy ? task.submittedBy.lastName : ""
        
        return (
            <div className="card-body">
                {/* <img
                
                /> */}
                <p className="card-text">{task.description}</p>
                <br/>
                {/* TODO */}
                {/* <p className="mark mb-0">
                    Assigned To: 
                </p>                           */}
                <p className="mb-0">
                    Submitted By: {submitterFirstName} {submitterLastName}
                </p>
                <p className="font-italic mb-0">
                    {`${new Date(task.created).toDateString() } @ ${new Date(task.created).toLocaleTimeString('en-US')}`}
                </p>
                <Link
                    to={`/`}
                    className="btn btn-raised btn-primary btn-sm"
                >
                    Back to All Tasks
                </Link>
            </div>
        )
    }
    
    render() {
        const {task} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{task.title}</h2>

                {!task ? (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderTask(task)
                )}

            </div>
        );
    }
}

export default SingleTask;
