import React, { Component } from 'react';
import {Route, Redirect} from "react-router-dom"
import {isAuthenticated} from '../auth'

const PrivateRoute = ({component: Component, ...rest}) => (
    // props: components passed down to this private route
    <Route 
        {...rest} 
        render={props => 
            isAuthenticated() ? (
                <Component {...props}/>
            ) : (
                <Redirect 
                    to={{
                        pathname: "/login", 
                        state: {from: props.location}
                    }}
                />
        )}  />
)

export default PrivateRoute;
