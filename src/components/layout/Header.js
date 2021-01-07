import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AuthOptions from "../auth/AuthOptions"
import logo from "../../favicon.ico"
import { Typography } from 'antd'
import isLoggedIn from "../../functions/isLoggedIn"

const { Title } = Typography

const Header = () => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isMobile] = useState(window.innerWidth < 435);

    useEffect(() => {
        let isCancelled = false

        const checkLoggedIn = async () => {
            if (!isCancelled) {
                setIsAuthorized(await isLoggedIn())
            }
        }

        checkLoggedIn()

        return () => isCancelled = true
    })

    return (
        <div style={styles.navBar}>
            <Link to={isAuthorized ? ('/') : ('/home')} style={styles.link}>
                <div style={styles.brandInfo}>
                    <img src={logo} style={styles.brandLogo} alt='shared-journal logo' />
                    {!isMobile ? <Title style={styles.brandText}>Shared Journal</Title> : <Title style={styles.brandText}>SJ</Title>}
                </div>
            </Link>
            {isAuthorized && <AuthOptions />}
        </div>
    )
}

export default Header

const styles = {
    navBar: {
        backgroundColor: 'rgb(205, 220, 250)',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        marginBottom: '20px',
    },
    brandText: {
        color: 'rgb(47, 88, 183)',
        fontSize: 30,
        margin: 0,
        padding: '0 0 0 10px'
    },
    brandLogo: {
        width: 30,
        height: 30
    },
    brandInfo: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10
    },
    link: {
        textDecoration: 'none'
    }
}