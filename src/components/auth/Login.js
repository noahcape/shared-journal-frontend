import React, { useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { useHistory } from "react-router-dom"
import { Form, Input, Alert, Button, Card, Typography } from "antd"
import axios from "axios"
require("dotenv").config()

const { Text, Title } = Typography

export default function Login({ setSignIn }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState({ msg: '' })

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async () => {
        try {
            const loginUser = { email, password }
            const loginRes = await axios.post(
                `https://${process.env.REACT_APP_SERVER}/users/login`,
                loginUser
            );

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem("auth-token", loginRes.data.token);

            history.push("/")
        } catch (err) {
            err.response.data && err.response.data.msg && setError({ ...error, msg: err.response.data.msg })
        }
    }

    return (
        <Card style={styles.logInForm}>
            <Title style={{ textAlign: 'center' }}>Log In</Title>
            {error.msg.length > 0 && <Alert style={styles.errorMsg} description={error.msg} type="error" action={<Button type='text' shape='circle' onClick={() => setError({ ...error, msg: '' })}>X</Button>} />}
            <Form {...layout}>
                <Form.Item label={<Text>Email</Text>}>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label={<Text>Password</Text>}>
                    <Input.Password onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' onClick={submit}>Log In</Button>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' onClick={() => setSignIn(false)}>I don't have an account - Register</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};

const styles = {
    logInForm: {
        width: 600,
        borderRadius: 8,
        margin: 25
    },
    errorMsg: {
        padding: 5,
        margin: '10px 0 10px 0'
    }
}