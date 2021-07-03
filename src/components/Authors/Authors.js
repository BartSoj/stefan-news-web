import "./Authors.css"
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {get} from "../../utils/user"

function Author(props) {
    return (
        <div className={"card"}>
            {props.image && <img src={`${process.env.REACT_APP_BUCKET_URL}/` + props.image} alt={"zdjęcie"}/>}
            <div className={"text"}>
                <h2>{props.firstname} {props.lastname}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

function Authors() {
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        get().then(res => {
            Array.isArray(res) ? setAuthors(res) : console.log(res)
        })
    }, [])

    const authorsList = authors.map(author => <Author key={author._id} firstname={author.firstname}
                                                      lastname={author.lastname}
                                                      image={author.image} description={author.description}/>)

    return (
        <div className={"authors"}>
            <div className={"author"}>
                <Link className={"authorButton"} to={"/zostań-redaktorem"}>Zostań redaktorem</Link>
            </div>
            <div className={"container"}>
                {authorsList}
            </div>
        </div>
    )
}

export default Authors