import "../../Authors.css"
import {getAll} from "../../../../utils/user"
import {useEffect, useState} from "react"

function Authors() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAll().then(res => setUsers(res))
    }, [])

    const authorsList = users.filter(user => user.role === "author").map(user => <tr key={user._id}>
        <th>{user.firstname}</th>
        <th>{user.lastname}</th>
        <th>{user.email}</th>
        <th>{user.show ? "Tak" : "Nie"}</th>
    </tr>)

    return (
        <div>
            <table className={"authors-table"}>
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Email</th>
                    <th>Pokazuj na stronie</th>
                </tr>
                </thead>
                <tbody>
                {authorsList}
                </tbody>
            </table>
        </div>
    )
}

export default Authors