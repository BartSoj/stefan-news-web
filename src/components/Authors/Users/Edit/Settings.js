import "./Settings.css"
import {deleteAccount, getMe, login, logout, update, updateImage} from "../../../../utils/user"
import {useContext, useEffect, useState} from "react"
import UserContext from "../../../../utils/userContext"
import {deleteImage, uploadImage} from "../../../../utils/upload"
import ErrorNotice from "../ErrorNotice"

function Settings() {
    const {setAuthorized} = useContext(UserContext)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [show, setShow] = useState(true)
    const [saveText, setSaveText] = useState("Zapisz")
    const [deleteAccountField, setDeleteAccountFiled] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        (async () => {
            const me = await getMe()
            setFirstname(me.firstname)
            setLastname(me.lastname)
            setEmail(me.email)
            setImage(me.image)
            setDescription(me.description)
            setShow(me.show)
        })()
    }, [])

    const addImage = async newImage => {
        if (image && image !== "default.jpg") {
            await deleteImage(image)
        }
        const filename = await uploadImage(newImage)
        await updateImage(filename)
        setImage(filename)
    }

    const save = () => {
        update(email, description, show)
        setSaveText("Zapisano!")
        setTimeout(() => {
            setSaveText("Zapisz")
        }, 5000)
    }

    const logoutOnClick = () => {
        logout()
        setAuthorized(false)
    }

    const confirmDeleteAccountOnClick = () => {
        setDeleteAccountFiled(true)
        setError("Aby usunąć konto wpisz hasło")
    }

    const deleteAccountOnClick = async () => {
        const res = await login(email, password)
        if (res === true) {
            await deleteAccount()
            setAuthorized(false)
        }
        setError(res)
    }


    return (
        <div>
            <div className={"authorSettings"}>
                <div className={"label"}>Imie: {firstname}</div>
                <div className={"label"}>Nazwisko: {lastname}</div>
                <div className={"label"}>Email: <input type="text" value={email}
                                                       onChange={e => setEmail(e.target.value)}/></div>
                <div className={"label"}>Zdjęcie:
                    <div className={"image"}><label htmlFor={"imageButton"}>
                        <img src={image ? `${process.env.REACT_APP_UPLOADS_URL}/` + image : ""}
                             alt={"zdjęcie"}/></label>
                        <input id={"imageButton"} type={"file"} onChange={e => addImage(e.target.files[0])}/>
                        <div className={"imageText"}>Zmień zdjęcie</div>
                    </div>
                </div>
                <div className={"label"}>Opis: <textarea value={description}
                                                         onChange={e => setDescription(e.target.value)}/></div>
                <div className={"label"}>Pokazuj na stronie: <label className={"switch"}>
                    <input className={show ? "checked" : ""} type={"checkbox"} onClick={() => setShow(!show)}/><span
                    className={"slider"}/>
                </label></div>
                <button className={"save"} onClick={() => save()}>{saveText}</button>
            </div>
            <div className={"authorLogout"}>
                {error && <div><ErrorNotice message={error} clearError={() => setError("")}/></div>}
                <button className={"logoutButton"} onClick={() => logoutOnClick()}>Wyloguj</button>
                <button className={deleteAccountField ? "hide" : "logoutButton"}
                        onClick={() => confirmDeleteAccountOnClick()}>Usuń konto
                </button>
                <input className={deleteAccountField ? "" : "hide"} type={"password"}
                       onChange={e => setPassword(e.target.value)} placeholder={"Hasło"}/>
                <button className={deleteAccountField ? "logoutButton" : "hide"}
                        onClick={() => deleteAccountOnClick()}>Potwierdź
                </button>
            </div>
        </div>
    )
}

export default Settings