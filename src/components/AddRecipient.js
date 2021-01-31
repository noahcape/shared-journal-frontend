import React from "react"
import axios from "axios"
import { Button } from 'antd'
require("dotenv").config()

export default class AddRecipient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: ""
        }

        this.submitRecipient = this.submitRecipient.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            recipient: e.target.value
        })
    }

    submitRecipient = (e) => {
        e.preventDefault();

        if (this.state.recipient === "") {
            return alert("You cannot leave recipient blank")
        }

        if (!this.props.recipients.includes(this.state.recipient)) {
            axios({
                url: `https://${process.env.REACT_APP_SERVER}/settings/add_recipient`,
                method: "PUT",
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
                data: {
                    recipient: this.state.recipient
                }
            })

            this.setState({
                recipient: ""
            })

        } else {
            alert(`Your recipient list already contains ${this.state.recipient}`)
        }
    }

    render() {
        return (
            <div>
                <label style={styles.recipientLabel}>Recipient</label>
                <input style={styles.emailInput} type="email" placeholder="email..." value={this.state.recipient} onChange={this.handleChange} />
                {/* <Button style={styles.submitButton} onClick={this.submitRecipient}>Submit</Button> */}
            </div>
        )
    }
}

const styles = {
    submitButton: {
        margin: '0 10px 0 10px'
    },
    emailInput: {
        borderWidth: 1,
        borderRadius: 8,
        border: '1px solid #d9d9d9',
        color: 'rgba(0, 0, 0, 0.85)',
        outline: 'none',
        padding: 4
    },
    recipientLabel: {
        paddingRight: 10
    }
}