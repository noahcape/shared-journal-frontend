import { Dispatch } from 'redux'
import { SettingsDispatchTypes, SETTINGS_FAIL, SETTINGS_LOADING, GET_EDIT_OR_POST_SETTINGS_SUCCESS } from './settingsActionsTypes'
import { UserDispatchTypes, EDIT_DISPLAY_NAME } from './userActionTypes'
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

export const newSettings = (data: any) => async (dispatch: Dispatch<SettingsDispatchTypes>) => {
    try {
        dispatch({
            type: SETTINGS_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/settings/new`,
            method: 'POST',
            data
        })

        dispatch({
            type: GET_EDIT_OR_POST_SETTINGS_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: SETTINGS_FAIL,
            msg: e.response.data.msg
        })
    }
}

export const getSettings = () => async (dispatch: Dispatch<SettingsDispatchTypes>) => {
    try {
        dispatch({
            type: SETTINGS_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/settings/`,
            method: 'GET',
            headers: { "x-auth-token": localStorage.getItem("auth-token") }
        })

        dispatch({
            type: GET_EDIT_OR_POST_SETTINGS_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: SETTINGS_FAIL,
            msg: e.response.data.msg
        })
    }
}

export const addRecipient = (recipient: string) => async (dispatch: Dispatch<SettingsDispatchTypes>) => {
    try {
        dispatch({
            type: SETTINGS_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/settings/add_recipient`,
            method: 'PUT',
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
            data: {
                recipient
            }
        })

        dispatch({
            type: GET_EDIT_OR_POST_SETTINGS_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: SETTINGS_FAIL,
            msg: e.response.data.msg
        })
    }
}

export const bulkAddRecipients = (recipients: string) => async (dispatch: Dispatch<SettingsDispatchTypes>) => {
    try {
        dispatch({
            type: SETTINGS_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/settings/bulk_add_recipients`,
            method: 'PUT',
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
            data: {
                recipients
            }
        })

        dispatch({
            type: GET_EDIT_OR_POST_SETTINGS_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: SETTINGS_FAIL,
            msg: e.response.data.msg
        })
    }
}

export const editJournalName = (newName: string) => async (dispatch: Dispatch<SettingsDispatchTypes | UserDispatchTypes>) => {
    dispatch({
        type: SETTINGS_LOADING
    })

    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND}/api/settings/edit_journal_name`,
        method: 'PUT',
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
        data: {
            newName
        }
    })

    dispatch({
        type: GET_EDIT_OR_POST_SETTINGS_SUCCESS,
        payload: res.data
    })

    dispatch({
        type: EDIT_DISPLAY_NAME,
        payload: res.data.journal_name
    })
}

export const deleteRecipient = (recipient: string) => async (dispatch: Dispatch<SettingsDispatchTypes>) => {
    try {
        dispatch({
            type: SETTINGS_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/settings/delete_recipient`,
            method: 'PUT',
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
            data: {
                recipient
            }
        })
        dispatch({
            type: GET_EDIT_OR_POST_SETTINGS_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: SETTINGS_FAIL
        })
    }
}

export const clearRecipients = () => async (dispatch: Dispatch<SettingsDispatchTypes>) => {
    try {
        dispatch({
            type: SETTINGS_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/settings/clear_recipients`,
            method: 'PUT',
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
        })

        dispatch({
            type: GET_EDIT_OR_POST_SETTINGS_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: SETTINGS_FAIL,
            msg: e.response.data.msg
        })
    }
}