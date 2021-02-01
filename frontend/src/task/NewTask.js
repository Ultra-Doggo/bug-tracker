import React, { Component } from 'react';
import {isAuthenticated} from '../auth'
import {create} from './apiTask'
import {Redirect} from 'react-router-dom'

class NewTask extends Component {

    constructor() {
        super()
        this.state = {
            title: "",
            description: "",
            photo: "",
            fileSize: 0,
            error: "",
            user: {},
            redirectToDashboard: false
        }
    }

    componentDidMount() {
        this.taskData = new FormData()
        this.setState({user: isAuthenticated().user})
    }

    isValid = () => {
        const { title, description, fileSize} = this.state
        console.log("inside isValid... fileSize = ", fileSize)
        if (title.length === 0) {
            this.setState({error: "Title is required."})
            return false
        }
        if (description.length === 0) {
            this.setState({error: "Description is required."})
            return false
        }
        if (fileSize > 1048576) {
            this.setState({
                error: "Image size must be less than 1 mb."
            })
            return false
        }
        return true
    }

    handleChange = (field) => (event) => {
        this.setState({ error: ""})
        const value = event.target.value
        this.taskData.set(field, value)
        this.setState({[field]: event.target.value})
    }

    handlePhotoChange = (field) => (event) => {
        const value = event.target.files[0]
        const fileSize = event.target.files[0].size
        this.taskData.set(field, value)
        this.setState({[field]: value, fileSize})
        console.log("inside handlePhotoChange ... fileSize = ", fileSize)
    }

    clickSubmit = (event) => {
        event.preventDefault()
        if (this.isValid()) {
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token

            create(userId, token, this.taskData).then(data => {
                if (data.error) {
                    this.setState({error: data.error})
                }
                else {
                    console.log(data)
                    this.setState({
                        title: "",
                        description: "",
                        redirectToDashboard: true
                    })
                }
            })
        }
        
    }

    newTaskForm = (title, description) => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input 
                        onChange={this.handleChange("title")} 
                        type="text" 
                        className="form-control"
                        value={title}
                        >    
                    </input>
                </div>
                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea 
                        onChange={this.handleChange("description")} 
                        type="text" 
                        className="form-control"
                        value={description}
                        >
                    </textarea>
                </div>
                <div className="form-group">
                    <label className="text-muted">{`Screenshot (smaller than 1 mb)`}</label>
                    <input 
                        onChange={this.handlePhotoChange("photo")} 
                        type="file" 
                        accept="image/*"
                        className="form-control"
                        >    
                    </input>
                </div>
                <button
                    onClick={this.clickSubmit} 
                    className="btn btn-raised btn-success"
                >
                    Create Task
                </button>
            </form>
        )
    }

    render() {
        const { title, description, photo, user, error, redirectToDashboard } = this.state

        if (redirectToDashboard) {
            return <Redirect to={`/user/${user._id}`}/>
        }
        
        return (
            <div className="container">

                <h2 className="mt-5 mb-5">Create a New Task</h2>

                {this.newTaskForm(title, description)}
                
                <div
                    className="alert alert-danger"
                    style={{display: error ? "" : "none"}} 
                    >
                        {error}
                </div>
                
            </div>
        );
    }
}

export default NewTask;
