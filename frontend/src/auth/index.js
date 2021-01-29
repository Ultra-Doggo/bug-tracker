export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}

export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    } 
}

export const register = (user) => {
    return (
        fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
    ) 
}

export const login = user => {
    return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const logout = (next) => {
    if(typeof Window !== "undefined") {
        localStorage.removeItem("jwt")
    }
    next()
    return (
        fetch("http://localhost:8080/logout", {
                method: "GET",
            })
            .then(response => {
                console.log('signout', response)
                return response.json()
            })
            .catch(err => console.log(err))
    )
}