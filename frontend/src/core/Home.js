import React from 'react'
import Tasks from '../task/Tasks'

const Home = () => (
    <div className="mb-5">
        <div className="jumbotron">
            <h2>Home</h2>
            <p className="lead">Welcome to React Frontend</p>
        </div>
        <div className="container">
            <Tasks />
        </div>
    </div>

    
)

export default Home;