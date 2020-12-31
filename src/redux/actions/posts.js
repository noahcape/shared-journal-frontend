import { ADD_POST, EDIT_POST, DELETE_POST, GET_POSTS } from '../actionTypes'
import axios from 'axios'

export const getPosts = () => async dispatch => {
    const res = await axios({
        url: `${process.env.REACT_APP_SERVER}/posts/`,
        method: "get",
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
    })

    dispatch({ type: GET_POSTS, payload: { content: res.data } })
}

export const addPost = (data) => async dispatch => {
    const res = await axios({
        url: `${process.env.REACT_APP_SERVER}/posts/new`,
        method: "post",
        headers: { "x-auth-token": localStorage.getItem("auth-token") }, data
    })

    dispatch({ type: ADD_POST, payload: res.data })
}

export const deletePost = (id) => async dispatch => {
    const res = await axios({
        url: `${process.env.REACT_APP_SERVER}/posts/${id}`,
        method: "delete",
        headers: { "x-auth-token": localStorage.getItem("auth-token") }
    })

    dispatch({ type: DELETE_POST, payload: res.data })
}

export const editPost = (id, text) => async dispatch => {
    const res = await axios({
        url: `${process.env.REACT_APP_SERVER}/posts/edit`,
        method: "put",
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
        params: {
            id: id,
            text: text
        }
    })

    dispatch({ type: EDIT_POST, payload: res.data })
}

export const deleteImages = (data) => async dispatch => {
    const res = await axios({
        url: `${process.env.REACT_APP_SERVER}/posts/deleteImage`,
        method: "delete",
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
        data
    })

    dispatch({ type: EDIT_POST, payload: res.data })
}