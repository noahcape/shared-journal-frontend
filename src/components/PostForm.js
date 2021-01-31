import React, { useState } from "react"
import { connect } from 'react-redux'
import FormData from "form-data"
import { newPost } from '../store/actions/postActions'
import { Button, Card, Input, Typography, Spin, Tooltip } from "antd"
import { UploadOutlined } from '@ant-design/icons'
import ImagePreview from "./ImagePreview"
import placeholderImage from "../placeholderImage.png"

const { TextArea } = Input
const { Text } = Typography

const PostForm = ({ newPost }) => {
    const today = `${new Date(Date.now()).getFullYear()}-${(new Date(Date.now()).getMonth() + 1 + "").length === 1 ? ((new Date(Date.now()).getMonth() + 1 + "").padStart(2, 0)) : (new Date(Date.now()).getMonth() + 1)}-${(new Date(Date.now()).getDate() + 1 + "").length === 1 ? ((new Date(Date.now()).getDate() + 1 + "").padStart(2, 0)) : (new Date(Date.now()).getDate() + 1)}`
    const [post, setPost] = useState("")
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('')
    const hiddenFileInput = React.useRef(null)

    const handleFileUpload = (e) => {
        const uploadedImages = []
        for (let i = 0; i < e.target.files.length; i++) {
            uploadedImages.push(e.target.files[i])
        }
        setImages(images.concat(uploadedImages))
    }

    const deleteImage = (image, key, index) => {
        const tempImages = []
        for (let i = 0; i < images.length; i++) {
            if (image !== images[i])
                tempImages.push(images[i])
        }
        setImages(tempImages)
    }

    const submitPost = () => {
        const data = new FormData()
        const postDate = new Date(date || Date.now())
        data.append("text", post)
        data.append('date', postDate)
        data.append("month", postDate.getMonth())
        data.append("year", postDate.getFullYear())
        images.map(image => {
            return data.append("image", image)
        })
        setLoading(true)
        newPost(data).then(() => {
            setLoading(false)
            setPost("")
            setImages([])
            setDate('')
        })
    }

    return (
        <div>
            <Spin spinning={loading}>
                <Card title='Compose a Post' style={styles.cardForm} headStyle={{ fontSize: 25 }}>
                    <div style={styles.postImageAndTextForm}>
                        {images.length !== 0 ? (
                            <div style={styles.uploadDiv}>
                                <div style={styles.imageFill}>
                                    <ImagePreview images={images} deleteImage={deleteImage} />
                                </div>
                            </div>
                        ) : (
                                <div style={styles.uploadDiv}>
                                    <div style={styles.imageFill} >
                                        <img src={placeholderImage} style={styles.placeholderImage} alt='placeholder' />
                                    </div>
                                    <input type="file" accept="image/*" ref={hiddenFileInput} style={{ display: 'none' }} multiple={true} onChange={handleFileUpload} />
                                    <Button style={styles.imageUploadButton} icon={<UploadOutlined />} onClick={() => hiddenFileInput.current.click()}>Click to Upload</Button>
                                </div>
                            )}
                        <TextArea style={styles.postTextArea} value={post} onChange={(e) => setPost(e.target.value)} placeholder="Start a new Post" />
                    </div>
                    <div style={styles.postDateAndUploadForm}>
                        <div style={styles.dateDiv}>
                            <Text style={{ color: 'rgb(245, 245, 245)', marginRight: 10 }}>Date</Text>
                            <input style={styles.dateInput} type='date' value={date || today} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <Tooltip title={post.length === 0 ? ("Your post must have text") : ''}>
                            <Button style={styles.submitButton} disabled={post.length === 0} onClick={submitPost}>Submit</Button>
                        </Tooltip>
                    </div>
                </Card>
            </Spin>
        </div>
    )
}

export default connect(null, { newPost })(PostForm)

const styles = {
    cardForm: {
        margin: 35,
        textAlign: 'center'
    },
    imageFill: {
        padding: 10,
        width: 280,
        height: 240,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1.5px solid black',
        borderRadius: 8
    },
    uploadDiv: {
        display: 'block',
    },
    postTextArea: {
        marginLeft: 25,
        height: 240,
        padding: 10,
        resize: 'none',
        fontSize: 15,
        outline: 'none'
    },
    postImageAndTextForm: {
        display: 'flex',
        margin: 25
    },
    postDateAndUploadForm: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 50,
        marginLeft: 50
    },
    dateDiv: {
        padding: '5px 10px 5px 10px',
        borderRadius: 8,
        display: 'flex',
        maxWidth: 350,
        margin: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(47, 88, 183)',
    },
    dateInput: {
        borderRadius: 2,
        border: 'none'
    },
    submitButton: {
        height: 34,
        border: 'none',
        borderRadius: 8,
        color: 'rgb( 245, 245, 245)',
        backgroundColor: 'rgb(47, 88, 183)'
    },
    imageUploadButton: {
        borderRadius: 8,
        marginTop: 5
    },
    placeholderImage: {
        maxWidth: 200,
        maxHeight: 250,
        width: 'auto',
        height: 'auto'
    }
}