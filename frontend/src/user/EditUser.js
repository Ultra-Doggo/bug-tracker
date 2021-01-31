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

    handleChange = (field) => (event) => {
        this.setState({[field]: event.target.value})
    }

    clickSubmit = (event) => {
        event.preventDefault()
        const {firstName, lastName, email, password} = this.state
        const user = {
            firstName,
            lastName,
            email,
            password
        }
        console.log(user)
        // TODO: send new data to the backend
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id
        this.init(userId)
    }

    updateForm = (firstName, lastName, email, password) => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">First Name</label>
                    <input 
                        onChange={this.handleChange("firstName")} 
                        type="text" 
                        className="form-control"
                        value={firstName}
                        >    
                    </input>
                </div>
                <div className="form-group">
                    <label className="text-muted">Last Name</label>
                    <input 
                        onChange={this.handleChange("lastName")} 
                        type="text" 
                        className="form-control"
                        value={lastName}
                        >
                    </input>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email Address</label>
                    <input 
                        onChange={this.handleChange("email")} 
                        type="email" 
                        className="form-control"
                        value={email}
                        >
                    </input>
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input 
                        onChange={this.handleChange("password")} 
                        type="password" 
                        className="form-control"
                        value={password}
                        >
                    </input>
                </div>
                <button
                    onClick={this.clickSubmit} 
                    className="btn btn-raised btn-primary"
                >
                    Update
                </button>
            </form>
        )
    }

    render() {
        const { firstName, lastName, email, password } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">User Settings</h2>

                {this.updateForm(firstName, lastName, email, password)}
            </div>
        );
    }
}

export default EditUser;
