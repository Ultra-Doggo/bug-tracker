import React, { Component } from 'react';
import {isAuthenticated} from '../auth'
import {remove} from './apiUser'
import {logout} from '../auth'
import { Redirect } from 'react-router-dom';

class DeleteUser extends Component {

    state = {
        redirect: false
    }

    deleteAccount = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId, token)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                logout(() => {
                    console.log("User account deleted.")
                })
                this.setState({redirect: true})
            }
        })
    }

    deleteConfirmation = () => {
        let answer = 
            window.confirm("Are you sure you wish to delete your account?")
        
        if (answer) {
            this.deleteAccount()
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to="/"/>
        }

        return (
            <button 
                onClick={this.deleteConfirmation} 
                className="btn btn-raised btn-danger"
            >
                Delete My Account
            </button>
        );
    }
}

export default DeleteUser;
