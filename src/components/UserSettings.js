import React, { useState, useEffect } from "react"
import axios from "axios"
import AddRecipient from "./AddRecipient"
import ErrorNotice from "./misc/ErrorNotice"

export default function UserSettings() {
    const [settings, setSettings] = useState()
    const [journalName, setJournalName] = useState()
    const [error, setError] = useState()
    const [editName, setEditName] = useState(false)
    const [addRecipient, setAddRecipient] = useState(false)

    useEffect(() => {
        let isCancelled = false

        const getSettings = async () => {
            const res = await axios({
                url: "http://localhost:5000/settings/get",
                method: "get",
                headers: { "x-auth-token": localStorage.getItem("auth-token") }

            })

            if (!isCancelled) setSettings(res.data)
        }

        getSettings()

        return (() => { return isCancelled = true })

    })

    const changeAddRecipient = () => {
        setAddRecipient(!addRecipient)
    }

    const deleteRecipient = async (e, recipient) => {
        e.preventDefault();

        await axios({
            url: "http://localhost:5000/settings/delete_recipient",
            method: "delete",
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
            data: {
                recipient
            }
        })

    }

    const editJournalName = async (e) => {
        e.preventDefault()

        if (journalName === "") {
            return setError("Your journal Name cannot be left empty")
        }

        try {
            await axios({
                url: `http://localhost:5000/settings/edit_name?journalName=${journalName}`,
                method: "PUT",
                headers: { "x-auth-token": localStorage.getItem("auth-token") }
            })

            setEditName(false)
        } catch (err) {
            err.response.data && err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <div>
            <h1>Settings</h1>
            <h3>Journal Name:</h3>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            {editName ? (
                <div className="user-settings-journal-name-edit">
                    <input
                        value={journalName}
                        onChange={(e) => setJournalName(e.target.value)}
                    />
                    <span>
                        <button onClick={(e) => editJournalName(e)}>submit</button>
                        <button onClick={() => { setEditName(false); setJournalName(settings.journal_name) }}>cancel</button>
                    </span>
                </div>
            ) : (
                    <span className="user-settings-journal-name-read">
                        <p>{settings && settings.journal_name}</p>
                        <button onClick={() => { setEditName(true); setJournalName(settings.journal_name) }}>edit</button>
                    </span>

                )
            }
            <h3>Sharing Method:</h3>
            <p>Journals are shared with their recipients on the end of every month.</p>
            <p>All posts made during the month are sent to your recipients.</p>
            <h3>Recipients:</h3>
            <p>Share your monthly updates with others by entering their email below.</p>

            {
                addRecipient ? (
                    <div>
                        <AddRecipient recipients={settings.recipients} changeAddRecipient={changeAddRecipient} />
                        <button className="cancel-recipient-button" onClick={changeAddRecipient}>x</button>
                    </div>
                ) : (
                        <>
                            <button className="add-recipient-button" onClick={changeAddRecipient}>+</button>
                            <span>add a recipient</span>
                        </>
                    )
            }

            <div className="recipient-container">
                {settings && settings.recipients.map((recipient, index) => {
                    return (
                        <span className="recipient" key={index}>
                            {recipient}
                            <button onClick={(e) => deleteRecipient(e, recipient)}>X</button>
                        </span>
                    )
                })}
            </div>
        </div >
    )
}