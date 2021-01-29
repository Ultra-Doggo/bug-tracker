import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {isAuthenticated, logout} from '../auth'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#004943'}
    }
    else {
        return {color: '#ffffff'}
    }
}

const TopNav = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
            </li>
            {/* NOT a logged in user */}
            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/register" style={isActive(history, "/register")}>Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" style={isActive(history, "/login")}>Login</Link>
                    </li>
                </>
            )}
            {/* for a logged in user */}
            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <a 
                        className="nav-link" 
                        style={
                            (isActive(history, "/logout"), 
                            {cursor: "pointer", color: "#fff"})
                        }
                        onClick={() => logout(() => history.push('/login'))}
                        >
                            Logout
                        </a>
                    </li>
                </>
            )}
        </ul>
    </div>
    
)

export default withRouter(TopNav);
