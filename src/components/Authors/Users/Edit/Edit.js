import "../../Authors.css"
import {deleteAccount, getMe} from "../../../../utils/user"
import UserContext from "../../../../utils/userContext"
import {useContext, useEffect, useState} from "react"
import AddArticles from "./AddArticles"
import EditArticles from "./EditArticles"
import Settings from "./Settings"
import Pending from "./Pending"
import Authors from "./Authors"
import Articles from "./Articles"

function Edit() {
    const {setAuthorized} = useContext(UserContext)
    const [me, setMe] = useState({})
    const [tab, setTab] = useState("add")

    useEffect(() => {
        getMe().then(res => setMe(res))
    }, [])

    const deleteAccountOnClick = async () => {
        await deleteAccount()
        setAuthorized(false)
    }

    if (me.role === undefined) {
        return null
    }

    if (me.role === "pending") {
        return (
            <div className={"pending"}>
                <div>Witaj {me.firstname} {me.lastname},</div>
                <div>Twoja prośba o dołączenie do naszej grupy redaktorów oczekuje na zatwierdzenie</div>
                <div>
                    <button onClick={() => deleteAccountOnClick()}>Anuluj i usuń konto</button>
                </div>
            </div>
        )
    }

    return (
        <div className={"editAuthors"}>
            <div className={"nav"}>
                <button className={tab === "add" ? "active" : ""}
                        onClick={() => setTab("add")}>Dodaj artykuł
                </button>
                <button className={tab === "edit" ? "active" : ""}
                        onClick={() => setTab("edit")}>Edytuj swoje artykuły
                </button>
                <button className={tab === "settings" ? "active" : ""}
                        onClick={() => setTab("settings")}>Ustawienia
                </button>
                {me.role === "admin" && <button className={tab === "authors" ? "active" : ""}
                                                onClick={() => setTab("authors")}>Redaktorzy</button>}
                {me.role === "admin" && <button className={tab === "pending" ? "active" : ""}
                                                onClick={() => setTab("pending")}>Oczekujący na zatwierdzenie</button>}
                {me.role === "admin" && <button className={tab === "articles" ? "active" : ""}
                                                onClick={() => setTab("articles")}>Artykuły</button>}
            </div>
            {tab === "add" && <AddArticles onSend={() => setTab("edit")}/>}
            {tab === "edit" && <EditArticles/>}
            {tab === "settings" && <Settings/>}
            {tab === "authors" && <Authors/>}
            {tab === "pending" && <Pending/>}
            {tab === "articles" && <Articles/>}
        </div>
    )
}

export default Edit