import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Register from './user/Register'
import Login from './user/Login'

const MainRouter = () => (
    <div>
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
        </Switch>
    </div>
)

export default MainRouter