async function getCategories() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/articles/categories`)
    return await response.json()
}

async function getArticles(config = {}) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/articles${config.category !== undefined ? "/categories/" + config.category : ""}/limit/${config.limit}`)
    return await response.json()
}

async function getMyArticles() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/articles/my`, {
        headers: {"x-auth-token": localStorage.getItem("auth-token")},
    })
    return await response.json()
}

async function getAllArticles() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/articles/all`, {
        headers: {"x-auth-token": localStorage.getItem("auth-token")},
    })
    return await response.json()
}

async function getArticle(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/articles/${id}`, {
        headers: {"x-auth-token": localStorage.getItem("auth-token")},
    })
    return await response.json()
}

async function addArticle(author, showAuthor, datetime, title, text, images, category) {
    const article = {author, showAuthor, datetime, title, text, images, category}
    try {
        const body = await fetch(`${process.env.REACT_APP_API_URL}/articles/add`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "x-auth-token": localStorage.getItem("auth-token")},
            body: JSON.stringify(article)
        })
        const responseJson = await body.json()
        if (responseJson === true) {
            return true
        } else {
            return responseJson.msg
        }
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function editArticle(id, showAuthor, title, text, images, category) {
    const body = {id, showAuthor, title, text, images, category}
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/articles/edit`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "x-auth-token": localStorage.getItem("auth-token")},
            body: JSON.stringify(body)
        })
        const responseJson = await response.json()
        if (responseJson === true) {
            return true
        } else {
            return responseJson.msg
        }
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function setArticleStatus(id, status) {
    const body = {id, status}
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/articles/setStatus`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "x-auth-token": localStorage.getItem("auth-token")},
            body: JSON.stringify(body)
        })
        const responseJson = await response.json()
        if (responseJson === true) {
            return true
        } else {
            return responseJson.msg
        }
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

async function deleteArticle(id) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/articles/${id}`, {
            method: "DELETE",
            headers: {"x-auth-token": localStorage.getItem("auth-token")},
        })
        const responseJson = await response.json()
        if (responseJson === true) {
            return true
        } else {
            return responseJson.msg
        }
    } catch {
        return "Mamy problemy z serwerem, spróbuj później"
    }
}

export {
    getCategories,
    getArticles,
    getMyArticles,
    getAllArticles,
    getArticle,
    addArticle,
    editArticle,
    setArticleStatus,
    deleteArticle
}