import React, { Component } from 'react';
import {isAuthenticated} from '../auth'
import {read, update} from './apiUser'
import {Redirect} from 'react-router-dom'

class EditUser extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            redirectToDashboard: false,
            error: ""
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id
        this.init(userId)
    }

    isValid = () => {
        const {firstName, lastName, email, password} = this.state
        if (firstName.length == 0) {
            this.setState({error: "First Name is required."})
            return false
        }
        if (lastName.length == 0) {
            this.setState({error: "Last Name is required."})
            return false
        }
        if (!/.+\@.+\..+/.test(email)) {
            this.setState({error: "A valid email is required."})
            return false
        }
        if (password.length >= 1) {
            if (password.length <= 5) {
                this.setState({error: "Password must contain at least 6 characters."})
                return false
            }
            if (!/\d/.test(password)) {
                this.setState({error: "Password must contain at least one number."})
                return false
            }
        }
        return true
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if (data.error) {
                this.setState({redirectToDashboard: true})
            } else {
                this.setState({ 
                    id: data._id, 
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    error: ""
                })
            }
        })
    }

    handleChange = (field) => (event) => {
        this.setState({[field]: event.target.value})
    }

    clickSubmit = (event) => {
        event.preventDefault()
        if (this.isValid()) {
            const {firstName, lastName, email, password} = this.state
            const user = {
                firstName,
                lastName,
                email,
                password: password || undefined // helps circumvent auth error
            }
            console.log(user)
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            update(userId, token, user).then(data => {
                if (data.error) {
                    this.setState({error: data.error})
                }
                else {
                    this.setState({
                        redirectToDashboard: true
                    })
                }
            })
        }
        
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
        const { id, firstName, lastName, email, password, redirectToDashboard, error } = this.state
        
        if (redirectToDashboard) {
            return <Redirect to={`/user/${id}`}/>
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">User Settings</h2>
                {this.updateForm(firstName, lastName, email, password)}
                <div
                    className="alert alert-danger"
                    style={{display: error ? "" : "none"}} 
                    >
                        {error}
                </div>
            </div>
        );
    }
}

export default EditUser;
