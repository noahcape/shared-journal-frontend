import React, { useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import isLoggedIn from "../../functions/isLoggedIn"

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const [isAuthorized, setIsAuthorized] = useState()

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            setIsAuthorized(isLoggedIn())
        }

        return () => isCancelled = true
    }, [])

    return (
        // restricted = false meaning public route and renders component
        // restricted = true meaning private route
        <Route {...rest} render={props => (
            isAuthorized && restricted ?
                <Redirect to="/" /> : <Component {...props} />
        )} />
    )
}

export default PublicRoute