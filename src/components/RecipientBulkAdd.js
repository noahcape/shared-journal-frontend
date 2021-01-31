import React from 'react'
import axios from 'axios'
require("dotenv").config()

const RecipientBulkAdd = (props) => {
    const [recipients, setRecipients] = React.useState('')

    const submitBulkAdds = async () => {
        if (recipients === '') {
            return alert('You must include at least one recipient')
        }

        await axios({
            url: `https://${process.env.REACT_APP_SERVER}/settings/bulk_add_recipients`,
            method: 'PUT',
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
            data: {
                'emails': recipients
            }
        }).then(() => props.setBulkAdd(false))
        setRecipients('')
    }

    return (
        <div style={styles.bulkAddDiv}>
            <h3>Bulk Add</h3>
            <div>
                Example: 'example@email.com, bestfriend@forever.com, secondcousin@family.com'
            </div>
            <textarea
                style={styles.bulkAddTextArea}
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder='add many recipients...'
            />
            <div>
                <button style={styles.submitButton} onClick={() => submitBulkAdds()}>submit</button>
                <button style={styles.cancelButton} onClick={() => { props.setBulkAdd(false); setRecipients('') }}>cancel</button>
            </div>
        </div>
    )
}

const styles = {
    bulkAddTextArea: {
        width: '650px',
        height: '200px',
        resize: 'none',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgb(0, 0, 0)',
        marginTop: 4,
    },
    bulkAddDiv: {
        display: 'block',
        borderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
    },
    cancelButton: {
        padding: 8,
        margin: 10,
        borderRadius: 8,
        backgroundColor: 'rgb(252, 167, 167)',
        color: 'white',
    },
    submitButton: {
        backgroundColor: 'rgb(129, 139, 249)',
        padding: 8,
        margin: 10,
        borderRadius: 8,
        color: 'white',
    }

}

export default RecipientBulkAdd