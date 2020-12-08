import React, { useState, useEffect } from "react"
import postAPI from "../API/posts.api"

import PostRead from "./PostRead"
import PostEdit from "./PostEdit"

export default function PostEditHandler(props) {
    const [isEditState, setIsEditState] = useState(false)
    const [post, setPost] = useState()

    useEffect(() => {
        let isCancelled = false
        
        const getPost = async () => {
            await postAPI.getPost(props.post._id).then(res => {
                if (!isCancelled) setPost(res)
            })
        }

        getPost()

        return () => {isCancelled = true}
    }, [isEditState, props.post._id])

    const changeEditState = () => {
        setIsEditState(!isEditState)
    }

    const deletePost = () => {
        postAPI.deletePost(props.post._id)
    }

    return (
        isEditState ? (
            <>
                {post && <PostEdit post={post} changeEditState={changeEditState} />}
            </>
        ) : (
                <div className="grid-item">
                    {post && <PostRead post={post} className="post-info" changeEditState={changeEditState} deletePost={deletePost}/>}
                </div>
            )
    )
}