
// function to check if a user if logged in or not. 
// returns boolean 

import axios from 'axios'
require("dotenv").config()

const isLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")

    if (token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
    }

    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND}/users/tokenIsValid`,
        method: 'POST',
        headers: { "x-auth-token": token }
    })
    
    return res.data
}

export default isLoggedIn