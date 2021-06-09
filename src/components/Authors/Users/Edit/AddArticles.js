import "./Articles.css"
import {useEffect, useState} from "react"
import {getMe} from "../../../../utils/user"
import {addArticle, editArticle} from "../../../../utils/article"
import ErrorNotice from "../ErrorNotice"
import {deleteImage, uploadImage} from "../../../../utils/upload"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons"

function AddArticles(props) {
    const [me, setMe] = useState({})
    const [id, setId] = useState()
    const [author, setAuthor] = useState("")
    const [showAuthor, setShowAuthor] = useState(true)
    const [datetime, setDatetime] = useState((new Date()).toLocaleDateString("pl"))
    const [title, setTitle] = useState("Tytuł")
    const [text, setText] = useState("Umieść tutaj treść artykułu")
    const [images, setImages] = useState([])
    const [category, setCategory] = useState("")
    const [error, setError] = useState()

    useEffect(() => {
        getMe().then(res => setMe(res))
    }, [])

    useEffect(() => {
        setAuthor(me.firstname + " " + me.lastname)
    }, [me])

    useEffect(() => {
        if (props.edit) {
            setId(props.edit._id)
            setAuthor(props.edit.author)
            setDatetime((new Date(props.edit.datetime)).toLocaleDateString("pl"))
            setTitle(props.edit.title)
            setText(props.edit.text)
            setImages(props.edit.images)
            setCategory(props.edit.category)
        }
    }, [props.edit])

    const addImage = async image => {
        const filename = await uploadImage(image)
        setImages(oldImages => [...oldImages, filename])
    }

    const cancelImage = async filename => {
        await deleteImage(filename)
        setImages(oldImages => oldImages.filter(img => img !== filename))
    }

    const send = async () => {
        let msg
        if (props.edit) {
            msg = await editArticle(id, showAuthor, title, text, images, category)
        } else {
            msg = await addArticle(author, showAuthor, datetime, title, text, images, category)
        }
        if (msg === true) {
            props.onSend()
        } else {
            setError(msg)
        }
    }


    return (
        <div>
            <div>
                <article className={"addArticle"}>
                    <div className={"author"}>Autor: {showAuthor ? author : "Anonimowy"} <input type={"checkbox"}
                                                                                                defaultChecked={true}
                                                                                                onChange={() => setShowAuthor(!showAuthor)}/>
                    </div>
                    <div
                        className={"datetime"}>{datetime}</div>
                    <div><input className={"title"} type={"text"} value={title}
                                onChange={e => setTitle(e.target.value)}/></div>
                    <div><textarea className={"text"} value={text}
                                   onChange={e => setText(e.target.value)}/>
                    </div>
                    <div className={"images"}>
                        {images && images.map((img, index) => (<div key={index} className={"image"}><img
                            src={`${process.env.REACT_APP_UPLOADS_URL}/${img}`}
                            alt={"zdjęcie"}/>
                            <button className={"delete-image"} onClick={() => cancelImage(img)}><FontAwesomeIcon
                                icon={faTrashAlt}/></button>
                        </div>))}
                        <label htmlFor={"add-image"} className={"add-image"}>Dodaj zdjęcie</label>
                        <input id={"add-image"} type={"file"} onChange={e => addImage(e.target.files[0])}/>
                    </div>
                </article>
            </div>
            <div className={"addArticleSubmit"}>
                <label>Kategoria: </label>
                <input type={"text"} value={category}
                       onChange={e => setCategory(e.target.value)}/>
                <button onClick={() => send()}>Prześlij do sprawdzenia</button>
            </div>
            <div>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)}/>}
            </div>
        </div>
    )
}

export default AddArticles