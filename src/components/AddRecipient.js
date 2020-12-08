import React from "react"
import axios from "axios"
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
                url: `http://${process.env.REACT_APP_SERVER}/settings/add_recipient`,
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
                <form className="new-recipient-form" onSubmit={this.submitRecipient}>
                    <input
                        type="email"
                        placeholder="enter their email here"
                        value={this.state.recipient}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="+" />
                    <span>add recipient</span>
                </form>
            </div>
        )
    }
}