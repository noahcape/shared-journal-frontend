import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import isLoggedIn from "../functions/isLoggedIn"

const Home = () => {
    const history = useHistory()

    useEffect(() => {
        let isCancelled = false

        const checkLoggedIn = async () => {
            if (!isCancelled) {
                if (await isLoggedIn()) {
                    history.push("/")
                }
            }
        }

        checkLoggedIn()

        return () => isCancelled = true
    })

    return (
        <div>
            <h2>
                Welcome to Shared-Journal
            </h2>
            <p>
                Here you can create a journal and we will take care of sharing your moments with your closest friends and family.
            </p>
        </div>
    )
}

export default Home