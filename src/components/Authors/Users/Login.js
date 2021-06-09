import "./Login.css"
import {useContext, useState} from "react"
import {Link} from "react-router-dom"
import {login} from "../../../utils/user"
import UserContext from "../../../utils/userContext"
import ErrorNotice from "./ErrorNotice"

function Login() {
    const {setAuthorized} = useContext(UserContext)
    const [error, setError] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submit = async (e) => {
        e.preventDefault()
        const authorized = await login(email, password)
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
                    <label>Email: </label>
                    <input type={"text"} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Hasło: </label>
                    <input type={"password"} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <input className={"save"} type={"submit"} value={"Login"}/>
                    {error && <div><ErrorNotice message={error} clearError={() => setError(undefined)}/></div>}
                    <Link className={"register"} to={"/zostań-redaktorem"}>Zostań redaktorem</Link>
                </div>
            </form>
        </div>
    )
}

export default Login