import React, { Component } from 'react';

class Register extends Component {

    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: ""
        }
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
        // console.log(user)
        this.register(user)
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

    render() {
        return (
            <div className="container">
                <h1 className="mt-5 mb-5">Sign Up</h1>
                <form>
                    <div className="form-group">
                        <label className="text-muted">First Name</label>
                        <input 
                            onChange={this.handleChange("firstName")} 
                            type="text" 
                            className="form-control"
                            value={this.state.firstName}
                            >    
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Last Name</label>
                        <input 
                            onChange={this.handleChange("lastName")} 
                            type="text" 
                            className="form-control"
                            value={this.state.lastName}
                            >
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email Address</label>
                        <input 
                            onChange={this.handleChange("email")} 
                            type="email" 
                            className="form-control"
                            value={this.state.email}
                            >
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input 
                            onChange={this.handleChange("password")} 
                            type="password" 
                            className="form-control"
                            value={this.state.password}
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
            </div>
        );
    }
}

export default Register;
