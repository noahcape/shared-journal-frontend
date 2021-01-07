import React, { useState, useContext } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { newSettings } from '../../store/actions/settingsActions'
import { registerUser, loginUser } from '../../store/actions/userActions'
import { Form, Input, Alert, Button, Card, Typography } from "antd"
require("dotenv").config()

const { Text, Title } = Typography

const Register = ({ setSignIn, newSettings, registerUser, loginUser }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [journalName, setJournalName] = useState()
    const [error, setError] = useState({ msg: '' })
    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = () => {
        let finalJournalName = journalName + " Journal"

        const newUser = { email, password, passwordCheck, displayName: finalJournalName }
        registerUser(newUser).then(() => {
            loginUser({ email, password }).then(({ token, user }) => {
                newSettings({ displayName: finalJournalName, recipients: [], user: user.id })
                setUserData({ token, user })
                localStorage.setItem("auth-token", token);
                history.push("/")
            })
        }).catch(err => setError({ ...error, msg: err.response.data.msg }))
    }

    return (
        <Card style={styles.RegisterForm}>
            <Title style={{ textAlign: 'center' }}>Register</Title>
            {error.msg.length > 0 && <Alert style={styles.errorMsg} description={error.msg} type="error" action={<Button type='text' shape='circle' onClick={() => setError({ ...error, msg: '' })}>X</Button>} />}
            <Form {...layout}>
                <Form.Item label={<Text>Email</Text>}>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label={<Text>Password</Text>}>
                    <Input.Password onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item label={<Text>Verify Password</Text>}>
                    <Input.Password placeholder="Verify password" onChange={(e) => setPasswordCheck(e.target.value)} />
                </Form.Item>
                <Form.Item label={<Text>Journal Name</Text>}>
                    <Input type="text" suffix="Journal" onChange={(e) => setJournalName(e.target.value)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' onClick={submit}>Register</Button>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' onClick={() => setSignIn(true)}>I have an account - Sign In</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default connect(null, { newSettings, loginUser, registerUser })(Register)

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};

const styles = {
    RegisterForm: {
        width: 600,
        borderRadius: 8,
        margin: 25,
    },
    errorMsg: {
        padding: 5,
        margin: '10px 0 10px 0'
    }
}