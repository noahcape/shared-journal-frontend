import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext"

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory();

    const register = () => {
        history.push("/register")
    }

    const login = () => {
        history.push("/login")
    }

    const userSettings = () => {
        history.push("/user_settings")
    }

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })

        localStorage.setItem("auth-token", "")
        window.location.reload(false)
        history.push("/home")

    }

    return (
        <nav className="auth-options">
            {userData.user ? (
                <>
                <button onClick={userSettings}>User Settings</button>
                <button onClick={logout}>Log out</button>
                </>
            ) : (
                <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Log in</button>
                </>
            )}

        </nav>
    )
}