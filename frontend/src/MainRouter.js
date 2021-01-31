import React from 'react'
import {Route, Switch} from 'react-router-dom'
import TopNav from './core/TopNav'
import Home from './core/Home'
import Register from './user/Register'
import Login from './user/Login'
import Dashboard from './user/Dashboard'
import EditUser from './user/EditUser'
import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => (
    <div>
        <TopNav />
        <Switch>
            <Route 
                exact path="/"
                component={Home}
            />
            <Route 
                exact path="/register"
                component={Register}
            />
            <Route 
                exact path="/login"
                component={Login}
            />
            <PrivateRoute
                exact path="/user/:userId"
                component={Dashboard}
            />
            <PrivateRoute 
                exact path="/user/settings/:userId"
                component={EditUser}
            />
        </Switch>
    </div>
)

export default MainRouter