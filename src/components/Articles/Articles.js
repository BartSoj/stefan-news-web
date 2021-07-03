import "./Articles.css"
import {useEffect, useState} from "react"
import {getArticles, getCategories} from "../../utils/article"

function Article(props) {
    const [expand, setExpand] = useState(true)
    return (
        <article className={"article"}>
            <div className={"author"}>Autor: {props.author}</div>
            <div className={"datetime"}>{props.datetime}</div>
            <div className={"title"}>{props.title}</div>
            <div className={"text" + (!expand ? " expand" : "")}>{props.text}</div>
            {props.expandButton && <button className={"expand-button"}
                                           onClick={() => setExpand(!expand)}>{expand ? "pokaż więcej" : "pokaż mniej"}</button>}
            <div className={"images"}>
                {props.images && props.images.map((img, index) => <img key={index}
                                                                       src={`${process.env.REACT_APP_BUCKET_URL}/${img}`}
                                                                       alt={"zdjęcie"}/>)}
            </div>
        </article>
    )
}


function Articles() {
    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [limit, setLimit] = useState(3)
    const [category, setCategory] = useState(undefined)

    useEffect(() => {
        getCategories().then(list => setCategories(list))
    }, [])

    useEffect(() => {
        getArticles({category: category, limit: limit}).then(list => setArticles(list))
    }, [category, limit])

    const articlesList = articles.filter(art => art.status === "zatwierdzony").map(art => {
        let expandButton = false
        if (art.text) {
            expandButton = true
        }
        return <Article key={art._id} author={art.showAuthor ? art.author : "Anonimowy"}
                        datetime={(new Date(art.datetime)).toLocaleDateString("pl")}
                        title={art.title} text={art.text} expandButton={expandButton}
                        images={art.images}/>
    })

    const categoriesList = categories.map(cat => <li key={cat}
                                                     className={cat === category ? "active" : ""}
                                                     onClick={() => {
                                                         setLimit(3)
                                                         if (category !== cat) {
                                                             setCategory(cat)
                                                         } else {
                                                             setCategory(undefined)
                                                         }

                                                     }}>{cat}</li>)

    return (
        <div>
            <div className={"tabs"}>
                {categoriesList}
            </div>
            <div className={"articles"}>
                {articlesList}
            </div>
            <div>
                {(articles.length >= limit) &&
                <button className={"more-button"} onClick={() => setLimit(limit + 3)}>Pokaż więcej</button>}
            </div>
        </div>

    )
}

export default Articles