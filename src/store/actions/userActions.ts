import { Dispatch } from 'redux'
import { UserDispatchTypes, REGISTER_USER, CHECK_USER_SIGNED_IN, LOGIN_USER, LOGOUT, GET_USER } from './userActionTypes'
import { PostDispatchTypes, CLEAN_STATE } from "./postActionTypes"
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

export const registerUser = (data: any) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND}/users/register`,
        method: 'POST',
        data
    })

    dispatch({
        type: REGISTER_USER,
        payload: res.data
    })
}

export const loginUser = (data: any) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND}/users/login`,
        method: 'POST',
        data
    })

    dispatch({
        type: LOGIN_USER,
        payload: res.data
    })

    return { token: res.data.token, user: res.data.user }
}

export const isTokenValid = (token: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND}/users/tokenIsValid`,
        method: 'POST',
        headers: { "x-auth-token": token }
    })

    dispatch({
        type: CHECK_USER_SIGNED_IN,
        payload: res.data
    })

    return res.data
}

export const getUser = (token: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND}/users/`,
        method: 'GET',
        headers: { 'x-auth-token': token }
    })

    dispatch({
        type: GET_USER,
        payload: res.data
    })

    return res.data
}

export const logOut = () => (dispatch: Dispatch<UserDispatchTypes | PostDispatchTypes>) => {
    console.log("CLEAN UP")
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: CLEAN_STATE
    })
}