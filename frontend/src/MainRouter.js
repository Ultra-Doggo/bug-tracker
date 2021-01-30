import React from 'react'
import {Route, Switch} from 'react-router-dom'
import TopNav from './core/TopNav'
import Home from './core/Home'
import Register from './user/Register'
import Login from './user/Login'
import Dashboard from './user/Dashboard'

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
        </Switch>
    </div>
)

export default MainRouter