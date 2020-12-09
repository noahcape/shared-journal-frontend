import React, { useState } from "react"
import FormData from "form-data"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"

import postAPI from "../API/posts.api"
import ImagePreview from "./ImagePreview"
import PostFormModal from "./PostFormModal"

export default function PostForm(props) {
    const [post, setPost] = useState("")
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [compose, setCompose] = useState(true)

    const handleChange = (event) => {
        setPost(event.target.value)
    }

    const handleFileUpload = (event) => {

        const images = []

        for (let i = 0; i < event.target.files.length; i++) {
            images.push(event.target.files[i])
        }

        setImages(images)

    }

    const deleteImage = (image, key, e) => {
        e.preventDefault()

        const tempImages = []

        for (let i = 0; i < images.length; i++) {
            if (image !== images[i])
                tempImages.push(images[i])
        }

        setImages(tempImages)

    }

    const changeCompose = () => {
        setCompose(!compose)
    }

    const newPost = async (e) => {
        e.preventDefault()

        if (post === "") {
            return alert("You must include at least a short amount of text")
        }

        const data = new FormData()
        const date = new Date(Date.now())

        data.append("text", post);
        images.map(image => {
            return data.append("image", image)
        })
        data.append("date", date)
        data.append("month", date.getMonth())
        data.append("year", date.getFullYear())

        setLoading(true)
        postAPI.addPost(data).then(() => {
            setLoading(false)
            props.setReload(!props.reload)
        })

        setPost("")
        setImages([])

    }

    return (
        <div>
            {loading ? (
                <div>
                    <ClimbingBoxLoader color={"black"} css={`margin: 0 auto;`} />
                    <p className="loading-message">We will be back with you shortly</p>
                </div>
            ) : (
                    <>
                        {compose ? (
                            <>
                                <div className="compose-post-handler" onClick={() => changeCompose()}>
                                    <h3>Compose a Post</h3>
                                    <button style={{ "fontSize": "25px" }}>v</button>
                                </div>
                                <div className="form-grid">
                                    {images.length !== 0 ? (
                                        <div className="fill">
                                            <ImagePreview images={images} deleteImage={deleteImage} />
                                        </div>
                                    ) : (
                                            <input type="file" className="fill" accept="image/*" multiple={true} onChange={handleFileUpload} />
                                        )}
                                    <div>
                                        <textarea
                                            type="textarea"
                                            value={post}
                                            onChange={handleChange}
                                            placeholder="Start a new Post"
                                        />
                                    </div>
                                    <div className="post-form-button-grid">
                                        <PostFormModal post={post} images={images} handleChange={handleChange} newPost={newPost} deleteImage={deleteImage} handleFileUpload={handleFileUpload} />
                                        <input type="submit" value="Submit" onClick={newPost} />
                                    </div>
                                </div>
                            </>
                        ) : (
                                <div className="compose-post-handler-closed" onClick={() => changeCompose()}>
                                    <h3>Compose a Post</h3>
                                    <button style={{ transform: "rotate(180deg)", "fontSize": "25px" }}>v</button>
                                </div>
                            )}

                    </>
                )}
        </div>
    )
}