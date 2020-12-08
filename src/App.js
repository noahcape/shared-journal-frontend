
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import axios from "axios"
import "./style.css"
import PrivateRoute from "./components/auth/PrivateRoute"
import isLoggedIn from "./functions/isLoggedIn"

import Header from "./components/layout/Header"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Home from "./components/Home"
import UserSettings from "./components/UserSettings"
import UserContext from "./context/UserContext"
import PublicView from "./components/PublicView"
import PublicHome from "./components/PublicHome"
require("dotenv").config()

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });


  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("auth-token")

      if (await isLoggedIn()) {
        
        let userRes = {}
        if (token !== "") {
          userRes = await axios.get(`http://${process.env.REACT_APP_SERVER}/users/`,
            { headers: { "x-auth-token": token } })
        }

        setUserData({
          token,
          user: userRes.data
        })
      }
    }

    checkLoggedIn()
  })

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route path="/login" component={Login}  />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/user_settings" component={UserSettings} />
              <Route path="/home" component={PublicHome} />
              <Route path="/visitor/:journalName" component={PublicView} />
              <PrivateRoute path="/" component={Home} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}