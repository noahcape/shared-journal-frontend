import React, { useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { useHistory } from "react-router-dom"
import ErrorNotice from "../misc/ErrorNotice"
import axios from "axios"
require("dotenv").config()

export default function Register() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [journalName, setJournalName] = useState()
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();

        try {
            let finalJournalName = journalName + " Journal"

            const newUser = { email, password, passwordCheck, displayName: finalJournalName }

            await axios.post(
                `https://${process.env.REACT_APP_SERVER}/users/register`,
                newUser
            );

            const loginRes = await axios.post(`https://${process.env.REACT_APP_SERVER}/users/login`, {
                email, password
            });

            const userID = loginRes.data.user.id

            await axios({
                url: `https://${process.env.REACT_APP_SERVER}/settings/new`,
                method: "POST",
                data: {
                    displayName: finalJournalName,
                    sharing_option: "monthly",
                    recipients: [],
                    user: userID
                }
            })

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem("auth-token", loginRes.data.token);

            history.push("/")
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div className="page">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="register-password">Password</label>
                <input
                    id="register-password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Verify password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                />

                <label htmlFor="register-display-name">Journal Name</label>
                <span className="journal-name-span">
                <input
                    className="journal-display-name"
                    id="register-display-name"
                    type="text"
                    onChange={(e) => setJournalName(e.target.value)}
                /> Journal
                </span>
                
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}