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

    render() {
        return (
            <div className="container">
                <h1 className="mt-5 mb-5">Sign Up</h1>
                <form>
                    <div className="form-group">
                        <label className="text-muted">First Name</label>
                        <input type="text" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Last Name</label>
                        <input type="text" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email Address</label>
                        <input type="email" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control"></input>
                    </div>
                    <button className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default Register;
