import React, { useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import isLoggedIn from "../../functions/isLoggedIn"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [loggedIn, setLoggedIn] = useState()

    useEffect(() => {
        let isCancelled = false

        const checkLoggedIn = async () => {
            if (!isCancelled) {
                setLoggedIn(await isLoggedIn())
            }
        }

        checkLoggedIn()

        return () => isCancelled = true
    })

    return (
        // show component only when user is logged in otherwise redirect to home
        loggedIn !== undefined ? <Route {...rest} render={props => (
            loggedIn ? (
                <>
                <Component {...props} />
                </>
            ) : (
                    <Redirect to="/home" />
                )
        )} /> : <div>Something went wrong</div>
    )
}

export default PrivateRoute