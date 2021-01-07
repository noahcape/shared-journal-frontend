import React, { useState } from "react"
import PostRead from "./PostRead"
import PostEdit from "./PostEdit"

const PostEditHandler = (props) => {
    const [isEditState, setIsEditState] = useState(false)

    const changeEditState = () => {
        setIsEditState(!isEditState)
    }

    return (
        isEditState ? (
            <PostEdit post={props.post} changeEditState={changeEditState} />
        ) : (
                <PostRead post={props.post} changeEditState={changeEditState} />
            )
    )
}

export default PostEditHandler