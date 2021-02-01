export const create = (userId, token, task) => {
    return (
        fetch(`${process.env.REACT_APP_API_URL}/task/new/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: task
        })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
    )
}

export const list = (token) => {
    return (
        fetch(`${process.env.REACT_APP_API_URL}/tasks/all`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    )
}

export const listByUser = (token, userId) => {
    return (
        fetch(`${process.env.REACT_APP_API_URL}/tasks/by/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    )
}

export const singleTask = (token, taskId) => {
    return (
        fetch(`${process.env.REACT_APP_API_URL}/task/${taskId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    )
}