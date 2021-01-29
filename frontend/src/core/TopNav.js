import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

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
                    <li className="nav-item">
                        <Link className="nav-link" to="/register" style={isActive(history, "/register")}>Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" style={isActive(history, "/login")}>Login</Link>
                    </li>
                </ul>
            </div>
    
)

export default withRouter(TopNav);
