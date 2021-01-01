import React, { useState, useEffect } from "react"
import axios from "axios"
import AddRecipient from "./AddRecipient"
import ErrorNotice from "./misc/ErrorNotice"
import RecipientBulkAdd from "./RecipientBulkAdd"
require("dotenv").config()

export default function UserSettings() {
    const [settings, setSettings] = useState()
    const [journalName, setJournalName] = useState()
    const [error, setError] = useState()
    const [editName, setEditName] = useState(false)
    const [addRecipient, setAddRecipient] = useState(false)
    const [bulkAdd, setBulkAdd] = useState(false)
    const [askDeleteAll, setAskDeleteAll] = useState(false)

    useEffect(() => {
        let isCancelled = false

        const getSettings = async () => {
            const res = await axios({
                url: `https://${process.env.REACT_APP_SERVER}/settings/get`,
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
            url: `https://${process.env.REACT_APP_SERVER}/settings/delete_recipient`,
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
                url: `https://${process.env.REACT_APP_SERVER}/settings/edit_name?journalName=${journalName}`,
                method: "PUT",
                headers: { "x-auth-token": localStorage.getItem("auth-token") }
            })

            setEditName(false)
        } catch (err) {
            err.response.data && err.response.data.msg && setError(err.response.data.msg)
        }
    }

    const deleteAll = async () => {
        await axios({
            url: `https://${process.env.REACT_APP_SERVER}/settings/clear_recipients`,
            method: 'PUT',
            headers: { "x-auth-token": localStorage.getItem("auth-token") }
        })
        setAskDeleteAll(false)
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

            {bulkAdd ? (
                <div>
                    <RecipientBulkAdd setBulkAdd={setBulkAdd} />
                </div>

            ) : (
                    <>
                        <div>
                            <button style={styles.startBulkAdd} onClick={() => setBulkAdd(!bulkAdd)}>start a bulk add</button>
                        </div>
                        {addRecipient ? (
                            <div>
                                <AddRecipient recipients={settings.recipients} changeAddRecipient={changeAddRecipient} />
                                <button className="cancel-recipient-button" onClick={changeAddRecipient}>x</button>
                            </div>
                        ) : (
                                <>
                                    <button className="add-recipient-button" onClick={changeAddRecipient}>+</button>
                                    <span>add a recipient</span>
                                </>
                            )}
                    </>
                )}
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
            {askDeleteAll ? (
                <div style={styles.deleteAllConfirm}>
                    <span>You sure... You would be deleting all your recipients</span>
                    <button style={styles.deleteAll} onClick={deleteAll}>Delete All</button>
                    <button style={styles.cancelButton} onClick={() => setAskDeleteAll(false)}>Cancel</button>
                </div>
            ) : (
                settings && settings.recipients.length > 0 && <button style={styles.deleteAll} onClick={() => setAskDeleteAll(true)}>Delete All</button>
            )}
        </div>
    )
}

const styles = {
    startBulkAdd: {
        padding: 8,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgb(129, 139, 249)',
        borderRadius: 8,
        color: 'white'
    },
    deleteAll: {
        padding: 8,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'rgb(252, 167, 167)',
        color: 'white',
    },
    cancelButton: {
        padding: 8,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'rgb(129, 139, 249)',
        color: 'white'
    },
    deleteAllConfirm: {
        display: 'flex',
        alignItems: 'center'
    }
}