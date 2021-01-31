import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import isLoggedIn from "../functions/isLoggedIn"
import { Typography, Row, Col } from 'antd'
import Login from "./auth/Login"
import Register from "./auth/Register"

const { Text, Title } = Typography

const Home = () => {
    const [signIn, setSignIn] = React.useState(true)
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
        <Row gutter={[10, 10]} style={styles.row}>
            <Col span={13}>
                <Title>Welcome to Shared-Journal</Title>
                <Text>Here you can create a journal and we will take care of sharing your moments with your closest friends and family.</Text>
            </Col>
            <Col>
                {signIn ? (
                    <Login setSignIn={setSignIn} />
                ) : (
                        <Register setSignIn={setSignIn} />
                    )}
            </Col>
        </Row>
    )
}

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}

export default Home