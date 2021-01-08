
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./style.css"
import { Layout } from "antd"
import { connect } from 'react-redux'
import { getPosts } from './store/actions/postActions'
import { getSettings } from './store/actions/settingsActions'
import { getUser } from './store/actions/userActions'
import isLoggedIn from "./functions/isLoggedIn"
import UserContext from "./context/UserContext"
import VisitorContext from "./context/VisitorContext"
import PrivateRoute from "./components/auth/PrivateRoute"
import Header from "./components/layout/Header"
import Home from "./components/Home"
import UserSettings from "./components/UserSettings"
import PublicView from "./components/PublicView"
import PublicHome from "./components/PublicHome"
import logo from "./favicon.ico"
import { getJournalName } from './store/selectors/userDataSelector';
require("dotenv").config()

const { Content, Footer } = Layout

const App = ({ getPosts, getSettings, getUser, journalName }) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const [visitor, setVisitor] = useState(false)
  const token = localStorage.getItem("auth-token")
  const [isMobile] = useState(window.innerWidth < 435);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (await isLoggedIn()) {
        if (token !== '') {
          getPosts()
          getSettings()
          getUser(token).then((res) => {
            setUserData({ token, user: res })
          })
        }
      }
    }
    checkLoggedIn()
  }, [token, getPosts, getSettings, getUser, journalName])

  return (
    <Layout style={styles.applicationContainer}>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <VisitorContext.Provider value={[visitor, setVisitor]}>
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
          </VisitorContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </Layout>
  );
}

const mapStateToProps = () => ({
  journalName: getJournalName()
})

export default connect(mapStateToProps, { getPosts, getSettings, getUser })(App)

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
