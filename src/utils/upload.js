async function uploadImage(image) {
    const formData = new FormData()
    formData.append("image", image)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/`, {
        method: "POST",
        headers: {"x-auth-token": localStorage.getItem("auth-token")},
        body: formData
    })
    return await response.json()
}

async function deleteImage(filename) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/${filename}`, {
        method: "DELETE",
        headers: {"x-auth-token": localStorage.getItem("auth-token")}
    })
    return await response.json()
}

export {uploadImage, deleteImage}