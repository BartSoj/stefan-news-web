async function register(firstname, lastname, email, password) {
    try {
        const registerUser = {firstname, lastname, email, password}
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(registerUser)
        })
        const responseJson = await response.json()
        const token = responseJson.token
        if (token) {
            localStorage.setItem("auth-token", token)
            return true
        } else {
            return responseJson.msg
        }
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function login(email, password) {
    try {
        const loginUser = {email, password}
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginUser)
        })
        const responseJson = await response.json()
        const token = responseJson.token
        if (token) {
            localStorage.setItem("auth-token", token)
            return true
        } else {
            return responseJson.msg
        }
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

function logout() {
    localStorage.setItem("auth-token", "")
}

async function deleteAccount() {
    try {
        await fetch(`${process.env.REACT_APP_API_URL}/users/delete`, {
            method: "DELETE",
            headers: {"x-auth-token": localStorage.getItem("auth-token")}
        })
        localStorage.setItem("auth-token", "")
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function deleteUser(user) {
    try {
        await fetch(`${process.env.REACT_APP_API_URL}/users/delete/${user}`, {
            method: "DELETE",
            headers: {"x-auth-token": localStorage.getItem("auth-token")}
        })
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function authorize() {
    let token = localStorage.getItem("auth-token")
    if (token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/tokenIsValid`, {
        method: "POST",
        headers: {"x-auth-token": token}
    })
    return await response.json()
}

async function getMe() {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
            headers: {"x-auth-token": localStorage.getItem("auth-token")}
        })
        return await response.json()
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function get() {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/`)
        return await response.json()
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function getAll() {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
            headers: {"x-auth-token": localStorage.getItem("auth-token")}
        })
        return await response.json()
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function updateRole(user, role) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/updateRole`, {
            method: "POST",
            headers: {"x-auth-token": localStorage.getItem("auth-token"), "Content-Type": "application/json"},
            body: JSON.stringify({user, role})
        })
        return await response.json()
    } catch (err) {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function update(email, description, show) {
    const body = {email, description, show}
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update`, {
            method: "POST",
            headers: {"x-auth-token": localStorage.getItem("auth-token"), "Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        return await response.json()
    } catch (err) {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function updateImage(image) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/updateImage`, {
            method: "POST",
            headers: {"x-auth-token": localStorage.getItem("auth-token"), "Content-Type": "application/json"},
            body: JSON.stringify({image})
        })
        return await response.json()
    } catch (err) {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

export {
    register,
    login,
    logout,
    deleteAccount,
    deleteUser,
    authorize,
    getMe,
    get,
    getAll,
    updateRole,
    update,
    updateImage
}