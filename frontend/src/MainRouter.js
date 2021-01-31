import React from 'react'
import {Route, Switch} from 'react-router-dom'
import TopNav from './core/TopNav'
import Home from './core/Home'
import Register from './user/Register'
import Login from './user/Login'
import Dashboard from './user/Dashboard'
import EditUser from './user/EditUser'

const MainRouter = () => (
    <div>
        <TopNav />
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/register">
                <Register/>
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/user/:userId">
                <Dashboard/>
            </Route>
            <Route exact path="/user/settings/:userId">
                <EditUser/>
            </Route>
        </Switch>
    </div>
)

export default MainRouter