import React, { Component } from 'react';
import {register} from '../auth'

class Register extends Component {

    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            key: "",
            error: "",
            success: false
        }
    }

    handleChange = (field) => (event) => {
        this.setState({error: ""})
        this.setState({[field]: event.target.value})
    }

    clickSubmit = (event) => {
        event.preventDefault()
        const {firstName, lastName, email, password, key} = this.state
        const user = {
            firstName,
            lastName,
            email,
            password,
            key
        }
        // console.log(user)
        register(user)
        .then(data => {
            if (data.error) {
                this.setState({error: data.error})
            }
            else {
                this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    key: "",
                    success: true
                })
            }
        })
    }
    
    registrationForm = (firstName, lastName, email, password, key) => {
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
                <div className="form-group">
                    <label className="text-muted">Organization Key</label>
                    <input 
                        onChange={this.handleChange("key")} 
                        type="password" 
                        className="form-control"
                        value={key}
                        >
                    </input>
                </div>
                <button
                    onClick={this.clickSubmit} 
                    className="btn btn-raised btn-primary"
                >
                    Submit
                </button>
            </form>
        )
    }

    render() {
        const {firstName, lastName, email, password, error, success} = this.state
        return (
            <div className="container w-50">
                <h1 className="mt-5 mb-5">Sign Up</h1>

                {this.registrationForm(firstName, lastName, email, password)}
                
                <div
                    className="alert alert-danger"
                    style={{display: error ? "" : "none"}} 
                    >
                        {error}
                </div>
                <div
                    className="alert alert-success"
                    style={{display: success ? "" : "none"}} 
                    >
                        Your account was created! Please login.
                </div>
            </div>
        );
    }
}

export default Register;
