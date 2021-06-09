import "./App.css"

import Navbar from "./components/Navbar/Navbar"
import Articles from "./components/Articles/Articles"
import Authors from "./components/Authors/Authors"
import About from "./components/About/About"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import {useEffect, useState} from "react"
import Edit from "./components/Authors/Users/Edit/Edit"
import Login from "./components/Authors/Users/Login"
import Register from "./components/Authors/Users/Register"
import {authorize} from "./utils/user"
import UserContext from "./utils/userContext"

function SetPath(props) {
    useEffect(() => {
        props.setPath()
    }, [props])

    return null
}

function App() {
    const [active, setActive] = useState("artykuły")
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        (async () => {
            const authorized = await authorize()
            setAuthorized(authorized)
        })()
    }, [])

    return (
        <div className={"app"}>
            <Router>
                <UserContext.Provider value={{authorized, setAuthorized}}>
                    <Navbar path={active}/>
                    <Switch>
                        <Route exact path={"/"}>
                            <Articles/>
                            <SetPath setPath={() => setActive("artykuły")}/>
                        </Route>
                        <Route exact path={"/redakcja"}>
                            <Authors/>
                            <SetPath setPath={() => setActive("redakcja")}/>
                        </Route>
                        <Route exact path={"/o-nas"}>
                            <About/>
                            <SetPath setPath={() => setActive("o-nas")}/>
                        </Route>
                        <Route exact path={"/edytuj"}>
                            {authorized ? <Edit/> : <Redirect to={"/zaloguj"}/>}
                        </Route>
                        <Route exact path={"/zaloguj"}>
                            {authorized ? <Redirect to={"/edytuj"}/> : <Login/>}
                        </Route>
                        <Route exact path={"/zostań-redaktorem"}>
                            {authorized ? <Redirect to={"/edytuj"}/> : <Register/>}
                        </Route>
                        <Redirect from={"/"} to={"/"}/>
                    </Switch>
                </UserContext.Provider>
            </Router>
        </div>

    )
}

export default App