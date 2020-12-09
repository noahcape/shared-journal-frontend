import React, { useState } from "react"
import postAPI from "../API/posts.api"

import PostRead from "./PostRead"
import PostEdit from "./PostEdit"

export default function PostEditHandler(props) {
    const [isEditState, setIsEditState] = useState(false)

    const changeEditState = () => {
        setIsEditState(!isEditState)
        props.setReload(!props.reload)
    }

    const deletePost = () => {
        postAPI.deletePost(props.post._id).then(() => props.setReload(!props.reload))
    }

    return (
        isEditState ? (
            <>
                <PostEdit post={props.post} changeEditState={changeEditState} />
            </>
        ) : (
                <div className="grid-item">
                    <PostRead post={props.post} className="post-info" changeEditState={changeEditState} deletePost={deletePost} setReload={props.setReload} reload={props.reload} />
                </div>
            )
    )
}