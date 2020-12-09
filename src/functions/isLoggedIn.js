// function to check if a user if logged in or not. 
// returns boolean 

import axios from "axios"
require("dotenv").config()

const isLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")

    if (token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
    }

    const tokenRes = await axios.post(
        `https://${process.env.REACT_APP_SERVER}/users/tokenIsValid`,
        null,
        { headers: { "x-auth-token": token } }
    )

    return tokenRes.data

}

export default isLoggedIn;