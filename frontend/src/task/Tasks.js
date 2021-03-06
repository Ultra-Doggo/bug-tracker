import React, { Component } from "react";
import { list } from "./apiTask";
import { Link } from "react-router-dom";
import {isAuthenticated} from "../auth"

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            tasks: []
        };
    }

    componentDidMount() {
        const token = isAuthenticated().token
        list(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ tasks: data });
            }
        });
    }

    renderTasks = tasks => {
        return (
            <div className="row">
                {tasks.map((task, i) => {
                    const submitterFirstName = task.submittedBy ? task.submittedBy.firstName : "N/A"
                    const submitterLastName = task.submittedBy ? task.submittedBy.lastName : ""
                    const shouldHighlightName = task.submittedBy._id === isAuthenticated().user._id
                    // TODO: also highlight name if task is ASSIGNED to the current viewing user
                    
                    return (
                        <div className="card col-md-4" key={i}>
                        <div className="card-body">
                            <h5 className="card-title">{task.title}</h5>
                            <p className="card-text">{task.description.substring(0, 100)}</p>
                            <br/>
                            {/* TODO */}
                            {/* <p className="mark mb-0">
                                Assigned To: 
                            </p>                           */}
                            <p className={shouldHighlightName ? 'mark mb-0' : 'mb-0'}>
                                Submitted By: {submitterFirstName} {submitterLastName}
                            </p>
                            <p className="font-italic mb-0">
                                {`${new Date(task.created).toDateString() } @ ${new Date(task.created).toLocaleTimeString('en-US')}`}
                            </p>
                            <Link
                                to={`/task/${task._id}`}
                                className="btn btn-raised btn-primary btn-sm"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                    )
                    

                })}
            </div>
        )
        
    };

    render() {
        const { tasks } = this.state;
        return (
            <div className="container mb-5">
                <h2 className="mt-5">
                    {!tasks.length ? "Loading..." : "All Tasks"}
                </h2>

                {this.renderTasks(tasks)}
            </div>
        );
    }
}

export default Tasks;