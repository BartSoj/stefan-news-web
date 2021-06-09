import "./Login.css"
import {Link} from "react-router-dom"
import {useContext, useState} from "react"
import {register} from "../../../utils/user"
import UserContext from "../../../utils/userContext"
import ErrorNotice from "./ErrorNotice"

function Register() {
    const {setAuthorized} = useContext(UserContext)
    const [error, setError] = useState()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submit = async (e) => {
        e.preventDefault()
        const authorized = await register(firstname, lastname, email, password)
        if (authorized === true) {
            setAuthorized(authorized)
        } else {
            setError(authorized)
        }
    }

    return (
        <div className={"login"}>
            <form onSubmit={submit}>
                <div>
                    <label>Imię: </label>
                    <input type={"text"} onChange={e => setFirstname(e.target.value)}/>
                </div>
                <div>
                    <label>Nazwisko: </label>
                    <input type={"text"} onChange={e => setLastname(e.target.value)}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type={"email"} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Hasło: </label>
                    <input type={"password"} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <input className={"save"} type={"submit"} value={"Zostań redaktorem"}/>
                    {error && <div><ErrorNotice message={error} clearError={() => setError(undefined)}/></div>}
                    <Link className={"register"} to={"/zaloguj"}>Zaloguj się</Link>
                </div>
            </form>
        </div>
    )
}

export default Register