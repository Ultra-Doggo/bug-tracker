import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {authenticate, login} from '../auth'
import {isAuthenticated} from '../auth'


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
        login(user)
        .then(data => {
            if (data.error) {
                this.setState({error: data.error})
            }
            else {
                authenticate(data, () => {
                    this.setState({redirect: true})
                })
            }
        })
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
        const {email, password, error, redirect} = this.state

        if (redirect) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />
        }

        return (
            <div className="container w-50">
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
