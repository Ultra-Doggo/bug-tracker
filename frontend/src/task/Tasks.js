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

    renderTasks = tasks => (
        <div className="row">
            {tasks.map((task, i) => (
                <div className="card col-md-4" key={i}>
                    <div className="card-body">
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                        <Link
                            to={`/task/${task._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { tasks } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Tasks</h2>

                {this.renderTasks(tasks)}
            </div>
        );
    }
}

export default Tasks;