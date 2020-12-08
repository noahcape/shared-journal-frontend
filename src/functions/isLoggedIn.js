// function to check if a user if logged in or not. 
// returns boolean 

import axios from "axios"

const isLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")

    if (token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
    }

    const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
    )

    return tokenRes.data

}

export default isLoggedIn;