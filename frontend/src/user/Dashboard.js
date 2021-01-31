import React, { Component } from 'react';
import {isAuthenticated} from '../auth'
import {Redirect} from 'react-router-dom'

class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            user: "",
            redirectToLogin: false
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.error) {
                this.setState({redirectToLogin: true})
            } else {
                this.setState({user: data})
            }
        })
    }

    render() {

        const redirect = this.state.redirectToLogin
        if (redirect) {
            return (
                <Redirect to="/login"/>
            )
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Dashboard</h2>
                <p>Welcome, {isAuthenticated().user.firstName}</p>
                <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
            </div>
        );
    }
}

export default Dashboard;