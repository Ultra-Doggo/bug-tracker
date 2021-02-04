import React, { Component } from 'react';
import {isAuthenticated} from '../auth'
import {Redirect, Link} from 'react-router-dom'
import {read} from './apiUser'
import DashboardTabs from './DashboardTabs'
import {listByUser} from '../task/apiTask'

class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            user: "",
            redirectToLogin: false,
            tasks: []
            // todo: ^ change to submissionTasks and AssignmentTasks
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if (data.error) {
                this.setState({redirectToLogin: true})
            } else {
                this.setState({user: data})
                this.loadTasks(data._id)
            }
        })
    }

    loadTasks = (userId) => {
        const token = isAuthenticated().token
        listByUser(token, userId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({tasks: data})
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    render() {

        const {redirect, user, tasks} = this.state
        if (redirect) {
            return (
                <Redirect to="/login"/>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5 mb-5">Dashboard</h2>
                        <p>Welcome, {user.firstName}</p>
                        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                    </div>
                    <div className="col-md-6">
                        {isAuthenticated().user && 
                            isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block mt-5">
                                <Link
                                    className="btn btn-raised btn-success mr-5"
                                    to={`/create/task`}
                                >
                                    Create Task
                                </Link>
                                <Link
                                    className="btn btn-raised btn-secondary mr-5"
                                    to={`/user/settings/${user._id}`}
                                >
                                    Settings
                                </Link>
                            </div>
                        )}
                        <hr/>
                        <DashboardTabs
                            tasks={tasks}
                        />
                    </div>
                </div>

                

            </div>
        );
    }
}

export default Dashboard;