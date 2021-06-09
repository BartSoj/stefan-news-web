import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons"

function ErrorNotice(props) {
    return (
        <span className={"error-notice"}>{props.message}
            <button onClick={() => props.clearError()}><FontAwesomeIcon
                icon={faTimesCircle}/></button></span>
    )
}

export default ErrorNotice