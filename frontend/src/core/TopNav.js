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
        <ul className="nav nav-tabs bg-primary justify-content-end">
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
                    <li className="nav-item ml-1 mr-1">
                        <Link 
                            to={`/user/${isAuthenticated().user._id}`} 
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item ml-1 mr-1">
                        <Link 
                            to={`/tasks/all`} 
                            style={isActive(history, `/tasks/all`)}
                            className="nav-link"
                        >
                            All Tasks
                        </Link>
                    </li>
                    <li className="nav-item ml-1 mr-1">
                        <Link 
                            to={`/create/task`} 
                            style={isActive(history, `/create/task`)}
                            className="nav-link"
                        >
                            Create Task
                        </Link>
                    </li>
                    <li className="nav-item ml-1 mr-1">
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
