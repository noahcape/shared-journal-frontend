import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AuthOptions from "../auth/AuthOptions"
import isLoggedIn from "../../functions/isLoggedIn"

export default function Header() {
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        let isCancelled = false

        const checkLoggedIn = async () => {
            if (!isCancelled) {
                setIsAuthorized(await isLoggedIn())
            }
        }

        checkLoggedIn()

        return () => isCancelled = true
    })

    return <header id="header">
        {isAuthorized ? (
            <Link to="/">
                <h1 className="title">Shared Journal</h1>
            </Link>
        ) : (
                <Link to="/home">
                    <h1 className="title">Shared Journal</h1>
                </Link>
            )}
        <AuthOptions />
    </header>
}