import {useEffect, useState} from "react"
import {getArticle, getMyArticles} from "../../../../utils/article"
import AddArticles from "./AddArticles"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEdit} from "@fortawesome/free-solid-svg-icons"

function EditArticles() {
    const [articles, setArticles] = useState([])
    const [editArticle, setEditArticle] = useState()

    useEffect(() => {
        getMyArticles().then(res => setArticles(res))
    }, [editArticle])

    const edit = async (id) => {
        const article = await getArticle(id)
        setEditArticle(article)
    }

    if (editArticle) {
        return <AddArticles onSend={() => setEditArticle(undefined)} edit={editArticle}/>
    }

    const articlesList = articles.map(art => <tr key={art._id}>
        <th>{art.title}</th>
        <th>{art.category}</th>
        <th>{art.showAuthor ? "Tak" : "Nie"}</th>
        <th>{(new Date(art.datetime)).toLocaleDateString("pl")}</th>
        <th>{art.status}</th>
        <th>
            <button className={"edit"} style={{"backgroundColor": "#FFAB1F"}} onClick={() => edit(art._id)}>
                <FontAwesomeIcon icon={faEdit}/></button>
        </th>
    </tr>)

    return (
        <div>
            <table className={"authors-table"}>
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Kategoria</th>
                    <th>Pokazuj autora</th>
                    <th>Data publikacji</th>
                    <th>Status</th>
                    <th>Edytuj</th>
                </tr>
                </thead>
                <tbody>
                {articlesList}
                </tbody>
            </table>
        </div>
    )
}

export default EditArticles