import React, { Component } from 'react';
import {singleTask, remove} from './apiTask'
import {isAuthenticated} from '../auth'
import {Redirect} from 'react-router-dom'

class SingleTask extends Component {
    state = {
        task: '',
        deleted: false
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

    deleteTask = () => {
        const taskId = this.props.match.params.taskId
        const token = isAuthenticated().token
        remove(taskId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({deleted: true})
            }
        })
    }

    deleteConfirmation = () => {
        let answer = 
            window.confirm("Are you sure you wish to delete this task?")
        
        if (answer) {
            this.deleteTask()
        }
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
                <div className="d-inline-block">
                    {isAuthenticated().user && isAuthenticated().user._id === task.submittedBy._id && (
                        <>
                            <button className="btn btn-raised btn-info mt-3 mr-3">
                                Update Task
                            </button>
                            <button 
                                className="btn btn-raised btn-danger mt-3 mr-3"
                                onClick={this.deleteConfirmation}
                            >
                                Delete Task
                            </button>
                        </>
                    )}                    
                </div>
            </div>
        )
    }
    
    render() {
        const {task, deleted} = this.state

        if (this.state.deleted) {
            return (
                <Redirect to={`/tasks/all`}/>
            )
        }

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
