import { Dispatch } from 'redux'
import axios from 'axios'
import { PostDispatchTypes, GET_POSTS_SUCCESS, ADD_POST_SUCCESS, EDIT_POST_SUCCESS, DELETE_POST_SUCESS, POST_FAIL, POST_LOADING } from './postActionTypes'
import * as dotenv from 'dotenv'
dotenv.config()

export const getPosts = () => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
        dispatch({
            type: POST_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/posts/`,
            method: 'GET',
            headers: { "x-auth-token": localStorage.getItem("auth-token") }
        })

        dispatch({
            type: GET_POSTS_SUCCESS,
            payload: res.data
        })

    } catch(e) {
        dispatch({
            type: POST_FAIL
        })
    }
}

export const publicGetPosts = (journalName: string) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
        dispatch({
            type: POST_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/posts/public_get?journal_name=${journalName}`,
            method: 'GET'
        })

        dispatch({
            type: GET_POSTS_SUCCESS,
            payload: res.data
        })

    } catch(e) {
        dispatch({
            type: POST_FAIL
        })
    }
}

export const newPost = (data: any) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
        dispatch({
            type: POST_LOADING
        })

        const res = await axios({
            url :`${process.env.REACT_APP_BACKEND}/api/posts/new`,
            method: "POST",
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
            data
        })

        dispatch({
            type: ADD_POST_SUCCESS,
            payload: res.data
        })

    } catch(e) {
        dispatch({
            type: POST_FAIL
        })
    }
}

export const editPost = (data: {}, id: string) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
        dispatch({
            type: POST_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/posts/edit_post?id=${id}`,
            method: 'PUT',
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
            data
        })

        dispatch({
            type: EDIT_POST_SUCCESS,
            payload: res.data
        })

    } catch(e) {
        dispatch({
            type: POST_FAIL
        })
    }
}

export const deletePost = (id: string) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
        dispatch({
            type: POST_LOADING
        })

        const res = await axios({
            url: `${process.env.REACT_APP_BACKEND}/api/posts/delete_post?id=${id}`,
            method: 'DELETE',
            headers: { "x-auth-token": localStorage.getItem("auth-token") }
        })

        dispatch({
            type: DELETE_POST_SUCESS,
            payload: res.data
        })

    } catch(e) {
        dispatch({
            type: POST_FAIL
        })
    }
}