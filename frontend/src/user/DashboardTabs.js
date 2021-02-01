import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class DashboardTabs extends Component {
    render() {
        const { tasks } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary">{tasks.length} Tasks</h3>
                        <hr />
                        {tasks.map((task, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/task/${task._id}`}>
                                        <div>
                                            <p className="lead">{task.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="col-md-4">
                        <h3 className="text-primary">{tasks.length} Tasks</h3>
                        <hr />
                        {tasks.map((task, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/task/${task._id}`}>
                                        <div>
                                            <p className="lead">{task.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">{tasks.length} Tasks</h3>
                        <hr />
                        {tasks.map((task, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/task/${task._id}`}>
                                        <div>
                                            <p className="lead">{task.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        );
    }
}

export default DashboardTabs;
