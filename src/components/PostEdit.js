import React, { useState } from "react"

import ImagePreview from "./ImagePreview"
import postAPI from "../API/posts.api"

export default function PostEdit(props) {
    const [editedText, setEditedTest] = useState(props.post.text)
    const [deletedImages, setDeletedImages] = useState([])
    const [deletedImageKeys, setDeletedImageKeys] = useState([])

    const submitChanges = async (e) => {
        e.preventDefault();

        if (editedText === "") {
            return (alert("You cannot leave your post without any text"))
        }

        postAPI.editPost(props.post._id, editedText);

        const data = {
            "id": props.post._id,
            "images": deletedImages,
            "keys": deletedImageKeys
        }

        postAPI.deleteImage(data).then(() => {
            props.changeEditState()
        })
    }

    const deleteImage = (image, key, e) => {
        e.preventDefault()

        setDeletedImages(deletedImages.concat([image]))
        setDeletedImageKeys(deletedImageKeys.concat([key]))
    }

    return (
        props.post.images.length === deletedImages.length ? (
            <div className="post-edit-grid-no-images">
                <textarea
                    type="textarea"
                    name="text"
                    defaultValue={props.post.text}
                    onChange={(e) => setEditedTest(e.target.value)}
                    placeholder="Add text to your Post"
                />
                <div>
                <button className="post-edit-submit-button" onClick={(e) => submitChanges(e)}>submit</button>
                <button className="post-edit-cancel-button" onClick={() => props.changeEditState()}>cancel</button>
                </div>

            </div>
        ) : (
                <div className="post-edit-grid">
                    <div className="post-edit-image-and-text">
                        <div className="edit-fill">
                            <ImagePreview post={props.post} images={props.post.images} deleteImage={deleteImage} />
                        </div >
                        <textarea
                            type="textarea"
                            name="text"
                            defaultValue={props.post.text}
                            onChange={(e) => setEditedTest(e.target.value)}
                            placeholder="Add text to your Post"
                        />
                    </div>
                    <div className="post-edit-button-container">
                        <button className="post-edit-submit-button" onClick={(e) => submitChanges(e)}>submit</button>
                        <button className="post-edit-cancel-button" onClick={() => props.changeEditState()}>cancel</button>
                    </div>
                </div >
            )


    )
}