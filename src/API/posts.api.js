import axios from "axios"
require("dotenv").config()

async function addPost(data) {
    await axios(`http://${process.env.REACT_APP_SERVER}/posts/new`, {
        method: "post",
        headers: { "x-auth-token": localStorage.getItem("auth-token") }, data
    })
}

async function deletePost(id) {
    await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/${id}`,
        method: "delete",
        headers: { "x-auth-token": localStorage.getItem("auth-token") }
    })
}

async function editPost(id, text) {
    await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/edit`,
        method: "put",
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
        params: {
            id: id,
            text: text
        }
    })
}

async function getPost(id) {
    const res = await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/getById?id=${id}`,
        method: "get",
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
    })

    return res.data;
}

async function getPosts() {
    const res = await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/`,
        method: "get",
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
    })

    return res.data;
}

async function deleteImage(data) {
    await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/deleteImage`,
        method: "delete",
        headers: { "x-auth-token": localStorage.getItem("auth-token")},
        data
    })
}

async function getDateOptions() {
    const res = await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/getDateOptions`,
        method: "GET",
        headers: { "x-auth-token": localStorage.getItem("auth-token")}
    })

    return res
}

async function getPostsByDate(month, year) {
    const res = await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/byDate?month=${month}&year=${year}`,
        method: "GET",
        headers: { "x-auth-token": localStorage.getItem("auth-token")}
    })

    return res
}

async function getPostsBy(month, year) {
    const res = await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/getBy?${month ? "&month=" + month : ""}${year ? "&year=" + year : ""}`,
        method: "GET",
        headers: { "x-auth-token": localStorage.getItem("auth-token")}
    })

    return res
}

async function publicGetDateOptions(journalName) {
    const res = await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/public_getDateOptions?journal_name=${journalName}`,
        method: "GET"
    })

    return res
}

async function publicGetPosts(journalName, month, year) {
    const res = await axios({
        url: `http://${process.env.REACT_APP_SERVER}/posts/public_get?journal_name=${journalName}${month ? "&month=" + month : ""}${year ? "&year=" + year : ""}`,
        method: "GET",
    })

    return res
}

export default { addPost, editPost, getPost, deletePost, getPosts, deleteImage, getDateOptions, getPostsByDate, publicGetPosts, publicGetDateOptions, getPostsBy};