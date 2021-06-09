import {useEffect, useState} from "react"
import {getAllArticles, setArticleStatus} from "../../../../utils/article"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons"

function Articles() {
    const [allArticles, setArticles] = useState([])

    useEffect(() => {
        getAllArticles().then(res => setArticles(res))
    }, [])

    const approve = id => {
        setArticleStatus(id, "zatwierdzony")
        const articles = allArticles.slice()
        const index = articles.findIndex(art => art._id === id)
        articles[index].status = "zatwierdzony"
        setArticles(articles)
    }

    const reject = id => {
        setArticleStatus(id, "odrzucony")
        const articles = allArticles.slice()
        const index = articles.findIndex(art => art._id === id)
        articles[index].status = "odrzucony"
        setArticles(articles)
    }

    const articlesList = (articles, approveButton, rejectButton) => (
        <table className={"authors-table"}>
            <thead>
            <tr>
                <th>Tytuł</th>
                <th>Kategoria</th>
                <th>Autor</th>
                <th>Pokazuj Autora</th>
                <th>data publikacji</th>
                <th>status</th>
                <th>Zatwierdź</th>
                <th>Odrzuć</th>
            </tr>
            </thead>
            <tbody>
            {articles.map(art => <tr key={art._id}>
                <th>{art.title}</th>
                <th>{art.category}</th>
                <th>{art.author}</th>
                <th>{art.showAuthor ? "Tak" : "Nie"}</th>
                <th>{(new Date(art.datetime)).toLocaleDateString("pl")}</th>
                <th>{art.status}</th>
                <th>
                    <button className={approveButton ? "edit" : "edit-disabled"}
                            style={{"backgroundColor": "green"}} onClick={() => approve(art._id)}>
                        <FontAwesomeIcon icon={faCheck}/></button>
                </th>
                <th>
                    <button className={rejectButton ? "edit" : "edit-disabled"}
                            style={{"backgroundColor": "red"}} onClick={() => reject(art._id)}>
                        <FontAwesomeIcon icon={faTimes}/></button>
                </th>
            </tr>)}
            </tbody>
        </table>
    )


    return (
        <div>
            <h2>Oczekujące na zatwierdzenie</h2>
            {articlesList(allArticles.filter(art => art.status === "nowy" || art.status === "edytowany"), true, true)}
            <h2>Zatwierdzone</h2>
            {articlesList(allArticles.filter(art => art.status === "zatwierdzony"), false, true)}
            <h2>Odrzucone</h2>
            {articlesList(allArticles.filter(art => art.status === "odrzucony"), true, false)}
        </div>
    )
}

export default Articles