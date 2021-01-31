import React, { useContext } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext"
import VisitorContext from '../../context/VisitorContext'
import { logOut } from "../../store/actions/userActions"

const AuthOptions = ({ logOut }) => {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext)
    const [visitor] = useContext(VisitorContext)

    const userSettings = () => {
        history.push("/user_settings")
    }

    const logout = () => {
        logOut()
        setUserData({ token: "", user: "" })
        localStorage.setItem("auth-token", "")
        history.push("/home")
    }

    return (
        userData.user && !visitor ? <div style={styles.buttonDiv}>
            <button style={styles.button} onClick={userSettings}>User Settings</button>
            <button style={styles.button} onClick={logout}>Log out</button>
        </div> : <></>
    )
}

export default connect(null, { logOut })(AuthOptions)

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