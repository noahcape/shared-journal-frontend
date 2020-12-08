import React from "react"

export default function ErrorNotice(props) {
    return (
        <span className="error-notice">
            {props.message}
            <button onClick={props.clearError}>X</button>
        </span>
    )
}