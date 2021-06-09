import {deleteUser, getAll, updateRole} from "../../../../utils/user"
import {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons"

function Pending() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAll().then(res => setUsers(res))
    }, [])

    const accept = async (user) => {
        await updateRole(user, "author")
        getAll().then(res => setUsers(res))
    }

    const refuse = async (user) => {
        await deleteUser(user)
        getAll().then(res => setUsers(res))
    }

    const pendingList = users.filter(user => user.role === "pending").map(user => <tr key={user._id}>
        <th>{user.firstname}</th>
        <th>{user.lastname}</th>
        <th>{user.email}</th>
        <th>
            <button className={"edit"} style={{"backgroundColor": "green"}} onClick={() => accept(user._id)}>
                <FontAwesomeIcon icon={faCheck}/></button>
        </th>
        <th>
            <button className={"edit"} style={{"backgroundColor": "red"}} onClick={() => refuse(user._id)}>
                <FontAwesomeIcon icon={faTimes}/></button>
        </th>
    </tr>)

    return (
        <div>
            <table className={"authors-table"}>
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Email</th>
                    <th>Zaakceptuj</th>
                    <th>Odrzuć</th>
                </tr>
                </thead>
                <tbody>
                {pendingList}
                </tbody>
            </table>
        </div>
    )
}

export default Pending