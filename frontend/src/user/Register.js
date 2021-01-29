import React, { Component } from 'react';

class Register extends Component {

    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
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
        const {firstName, lastName, email, password} = this.state
        const user = {
            firstName,
            lastName,
            email,
            password
        }
        // console.log(user)
        this.register(user)
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
                    success: true
                })
            }
        })
    }

    register = user => {
        return fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }

    registrationForm = (firstName, lastName, email, password) => {
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
                    Submit
                </button>
            </form>
        )
    }

    render() {
        const {firstName, lastName, email, password, error, success} = this.state
        return (
            <div className="container">
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
