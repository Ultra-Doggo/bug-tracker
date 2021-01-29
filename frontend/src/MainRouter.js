import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Register from './user/Register'

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/register">
                <Register/>
            </Route>
        </Switch>
    </div>
)

export default MainRouter