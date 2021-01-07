import React, { useState, useContext } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { loginUser } from '../../store/actions/userActions'
import { Form, Input, Alert, Button, Card, Typography } from "antd"
require("dotenv").config()

const { Text, Title } = Typography

const Login = ({ setSignIn, loginUser }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState({ msg: '' })
    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async () => {
        const loginData = { email, password }
        try {
            const loginRes = await loginUser(loginData)
            setUserData({token: loginRes.token, user: loginRes.user})
            localStorage.setItem("auth-token", loginRes.token)
            history.push('/')
        } catch(e) {
            e.response.data && e.response.data.msg && setError({ ...error, msg: e.response.data.msg })
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

export default connect(null, { loginUser })(Login)

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