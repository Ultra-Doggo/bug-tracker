import React, { Component } from 'react';
import {isAuthenticated} from '../auth'
import {read} from './apiUser'

class EditUser extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if (data.error) {
                this.setState({redirectToLogin: true})
            } else {
                this.setState({ 
                    id: data._id, 
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                })
            }
        })
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id
        this.init(userId)
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">User Settings</h2>
            </div>
        );
    }
}

export default EditUser;
