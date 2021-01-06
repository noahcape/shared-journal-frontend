import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext"

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory();

    const userSettings = () => {
        history.push("/user_settings")
    }

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })

        localStorage.setItem("auth-token", "")
        // window.location.reload(false)
        history.push("/home")

    }

    return (
        userData.user ? (
            <div style={styles.buttonDiv}>
                <button style={styles.button} onClick={userSettings}>User Settings</button>
                <button style={styles.button} onClick={logout}>Log out</button>
            </div>
        ) : <></>
    )
}

const styles = {
    buttonDiv: {
        display: 'flex'
    },
    button: {
        height: '50px',
        backgroundColor: 'rgb(47, 88, 183)',
        color: 'rgb(245, 245, 245)',
        alignItems: 'center',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        fontSize: 15,
        padding: '0 10px 0 10px'
    }
}