import React, { Component } from 'react';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirect: false
        }
    }

    handleChange = (field) => (event) => {
        this.setState({error: ""})
        this.setState({ [field]: event.target.value})
    }

    clickSubmit = (event) => {
        event.preventDefault()
        const {email, password} = this.state
        const user = {
            email,
            password
        }
        // console.log(user)
        this.login(user)
        .then(data => {
            if (data.error) {
                this.setState({error: data.error})
            }
            else {
                // TODO: authenticate
            }
        })
    }

    login = user => {
        return fetch("http://localhost:8080/login", {
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

    loginForm = (email, password) => {
        return (
            <form>
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
        const {email, password, error} = this.state
        return (
            <div className="container">
                <h1 className="mt-5 mb-5">Login</h1>

                {this.loginForm(email, password)}
                
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

export default Login;
