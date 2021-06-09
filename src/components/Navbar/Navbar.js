import "./Navbar.css"
import {Link} from "react-router-dom"

function Navbar(props) {
    return (
        <header>
            <Link className={"logo"} to={"/artykuły"}>Stefan News</Link>
            <nav>
                <ul>
                    <li><Link className={props.path === "artykuły" ? "active" : ""}
                              to={"/artykuły"}>Artykuły</Link></li>
                    <li><Link className={props.path === "redakcja" ? "active" : ""}
                              to={"/redakcja"}>Redakcja</Link></li>
                    <li><Link className={props.path === "o-nas" ? "active" : ""}
                              to={"/o-nas"}>O Nas</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar