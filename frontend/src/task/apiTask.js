export const create = (userId, token, task) => {
    return (
        fetch(`${process.env.REACT_APP_API_URL}/new/task/${userId}`, {
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