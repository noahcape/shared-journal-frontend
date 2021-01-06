
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import axios from "axios"
import "./style.css"
import { Layout } from "antd"

import PrivateRoute from "./components/auth/PrivateRoute"
import isLoggedIn from "./functions/isLoggedIn"

import Header from "./components/layout/Header"
import Home from "./components/Home"
import UserSettings from "./components/UserSettings"
import UserContext from "./context/UserContext"
import PublicView from "./components/PublicView"
import PublicHome from "./components/PublicHome"
import logo from "./favicon.ico"
require("dotenv").config()

const { Content, Footer } = Layout

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const token = localStorage.getItem("auth-token")
  const [isMobile] = useState(window.innerWidth < 435);


  useEffect(() => {
    const checkLoggedIn = async () => {

      if (await isLoggedIn()) {

        let userRes = {}
        if (token !== "") {
          userRes = await axios.get(`https://${process.env.REACT_APP_SERVER}/users/`,
            { headers: { "x-auth-token": token } })
        }

        setUserData({
          token,
          user: userRes.data
        })
      }
    }

    checkLoggedIn()
  }, [token])

  return (
    <Layout style={styles.applicationContainer}>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Content style={!isMobile ? ({ margin: '0 150px' }) : ({ margin: 0 })}>
            <div style={isMobile ? styles.applicationLayoutContentMobile : styles.applicationLayoutContentWeb}>
              <Switch>
                <PrivateRoute path="/user_settings" component={UserSettings} />
                <Route path="/home" component={PublicHome} />
                <Route path="/visitor/:journalName" component={PublicView} />
                <PrivateRoute path="/" component={Home} />
              </Switch>
            </div>
          </Content>
          <Footer style={styles.applicationFooter}>Shared Journal <img src={logo} alt='logo' style={styles.applicationLogo} /> Created by Noah Cape</Footer>
        </UserContext.Provider>
      </BrowserRouter>
    </Layout>
  );
}

const styles = {
  applicationContainer: {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },
  applicationLayoutContentWeb: {
    minHeight: 280,
    padding: 24,
    background: 'rgb(255, 255, 255)'
  },
  applicationLayoutContentMobile: {
    minHeight: 500,
    background: 'rgb(255, 255, 255)'
  },
  applicationFooter: {
    textAlign: 'center',
  },
  applicationLogo: {
    width: 20,
    height: 20
  }
}