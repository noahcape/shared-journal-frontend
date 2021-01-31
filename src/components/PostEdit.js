import React, { useState } from "react"
import { Typography, Spin, Input, Card, Button } from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import FormData from "form-data"
import { connect } from 'react-redux'
import { editPost } from '../store/actions/postActions'
import placeholderImage from "../placeholderImage.png"

const { Text } = Typography
const { TextArea } = Input

const PostEdit = ({ editPost, post, changeEditState }) => {
    const date = `${new Date(post.date).getFullYear()}-${(new Date(post.date).getMonth() + 1 + "").length === 1 ? ((new Date(post.date).getMonth() + 1 + "").padStart(2, 0)) : (new Date(post.date).getMonth() + 1)}-${(new Date(post.date).getDate() + 1 + "").length === 1 ? ((new Date(post.date).getDate() + 1 + "").padStart(2, 0)) : (new Date(post.date).getDate() + 1)}`
    const [editedText, setEditedTest] = useState(post.text)
    const [editedImages, setEditedImages] = useState(post.images)
    const [editedImageKeys, setEditedImageKeys] = useState(post.image_keys)
    const [deletedImages, setDeletedImages] = useState([])
    const [deletedImageKeys, setDeletedImageKeys] = useState([])
    const [editedDate, setEditedDate] = useState('')
    const [newImages, setNewImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [counter, setCounter] = useState(0)
    const hiddenFileInput = React.useRef(null)

    const submitChanges = () => {
        if (editedText === "") { return (alert("You cannot leave your post without any text")) }
        const data = new FormData()
        newImages.forEach(image => {
            return data.append("image", image)
        })
        data.append("text", editedText)
        data.append("dateTime", editedDate)
        data.append("imagesToDelete", deletedImages)
        data.append("keysToDelete", deletedImageKeys)

        setLoading(true)
        editPost(data, post._id).then(() => {
            setLoading(false)
            changeEditState()
        })
    }

    const handleFileUpload = (e) => {
        const uploadedImages = []
        for (let i = 0; i < e.target.files.length; i++) {
            uploadedImages.push(e.target.files[i])
        }
        setNewImages(newImages.concat(uploadedImages))
    }

    const deleteImage = (index) => {
        if (index <= editedImages.length - 1) {
            setDeletedImages(deletedImages.concat([editedImages[index]]))
            const tempImages = []
            editedImages.forEach((image, i) => {
                if (i !== index) { tempImages.push(image) }
            })
            setEditedImages(tempImages)
            setDeletedImageKeys(deletedImageKeys.concat([editedImageKeys[index]]))
            const tempKeys = []
            editedImageKeys.forEach((key, i) => {
                if (i !== index) { tempKeys.push(key) }
            })
            setEditedImageKeys(tempKeys)
        } else {
            const tempImages = []
            newImages.forEach((image, i) => {
                if (i !== index - editedImages.length) { tempImages.push(image) }
            })
            setNewImages(tempImages)
        }
        setCounter(0)
    }

    const renderImage = () => {
        return editedImages.concat(newImages).map((image, index) => {
            return (
                typeof image === 'string' ? (
                    <img style={index === counter ? styles.imageScrollActive : styles.imageScroll} src={image} alt={image} key={index} />
                ) : (
                        <img style={index === counter ? styles.imageScrollActive : styles.imageScroll} src={URL.createObjectURL(image)} alt={image} key={index} />
                    )
            )
        })
    }

    return (
        <Spin spinning={loading}>
            <Card style={styles.cardForm} actions={[
                <CloseCircleOutlined onClick={() => changeEditState()} />,
                <CheckCircleOutlined onClick={() => submitChanges()} />
            ]}>
                {editedImages.concat(newImages).length === 0 ? (
                    <div style={styles.postImageAndTextForm}>
                        <div style={styles.uploadDiv}>
                            <div style={styles.imageFill} >
                                <img src={placeholderImage} style={styles.placeholderImage} alt='placeholder' />
                            </div>
                            <input type="file" accept="image/*" ref={hiddenFileInput} style={{ display: 'none' }} multiple={true} onChange={handleFileUpload} />
                            <Button style={styles.imageUploadButton} icon={<UploadOutlined />} onClick={() => hiddenFileInput.current.click()}>Click to Upload</Button>
                        </div>
                        <TextArea style={styles.postTextArea} name="text" defaultValue={post.text} onChange={(e) => setEditedTest(e.target.value)} placeholder="Add text to your Post" />
                    </div>
                ) : (
                        editedImages && <div style={styles.postImageAndTextForm}>
                            <div style={styles.uploadDiv}>
                                <div style={styles.imageFill}>
                                    <div style={styles.imageScrollControlsContainer}>
                                        <div style={styles.imageScrollContainer}>
                                            {editedImages.concat(newImages).length > 1 && <button style={styles.imageScrollControls} onClick={() => { counter === 0 ? setCounter(editedImages.concat(newImages).length - 1) : setCounter(counter - 1) }}>{"<"}</button>}
                                            {renderImage()}
                                            {editedImages.concat(newImages).length > 1 && <button style={styles.imageScrollControls} onClick={() => { counter === editedImages.concat(newImages).length - 1 ? setCounter(0) : setCounter(counter + 1) }}>{">"}</button>}
                                        </div>
                                        <DeleteOutlined onClick={() => deleteImage(counter)} />
                                    </div>
                                </div>
                                <input type="file" accept="image/*" ref={hiddenFileInput} style={{ display: 'none' }} multiple={true} onChange={handleFileUpload} />
                                <Button style={styles.imageUploadButton} icon={<UploadOutlined />} onClick={() => hiddenFileInput.current.click()}>Click to Upload</Button>
                            </div>
                            <TextArea style={styles.postTextArea} name="text" defaultValue={post.text} onChange={(e) => setEditedTest(e.target.value)} placeholder="Add text to your Post" />
                        </div>
                    )}
                <div style={styles.dateDiv}>
                    <Text style={{ color: 'rgb(245, 245, 245)', marginRight: 10 }}>Date</Text>
                    <input type='date' style={styles.dateInput} value={editedDate || date} onChange={(e) => setEditedDate(e.target.value)} />
                </div>
            </Card>
        </Spin>
    )
}

export default connect(null, { editPost })(PostEdit)

const styles = {
    cardForm: {
        margin: 35,
        paddingRight: 25,
        paddingLeft: 25,
        textAlign: 'center'
    },
    postImageAndTextForm: {
        display: 'flex',
        margin: 25
    },
    uploadDiv: {
        display: 'block',
    },
    imageUploadButton: {
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 4
    },
    placeholderImage: {
        maxWidth: 200,
        maxHeight: 250,
        width: 'auto',
        height: 'auto'
    },
    imageFill: {
        padding: 10,
        width: 280,
        height: 240,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1.5px solid black',
        borderRadius: 8,
        // marginRight: 25
    },
    dateDiv: {
        padding: '5px 10px 5px 10px',
        borderRadius: 8,
        display: 'flex',
        maxWidth: 350,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(47, 88, 183)',
    },
    dateInput: {
        borderRadius: 2,
        border: 'none'
    },
    postTextArea: {
        margin: '0 0 20px 0',
        height: 240,
        padding: 10,
        resize: 'none',
        fontSize: 15,
        outline: 'none',
        marginLeft: 25
    },
    image: {
        borderRadius: 4,
        margin: '3px 15px 15px 15px',
        maxWidth: 200,
        maxHeight: 185,
        width: 'auto',
        height: 'auto',
    },
    imageScrollActive: {
        position: 'relative',
        borderRadius: 4,
        margin: '3px 15px 15px 15px',
        maxWidth: 200,
        maxHeight: 185,
        width: 'auto',
        height: 'auto',

    },
    imageScroll: {
        display: 'none',
    },
    imageScrollContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageScrollControls: {
        border: 'none',
        backgroundColor: 'rgb(255, 255, 255)',
        outline: 'none',
        cursor: 'pointer',
        padding: 0,
        margin: 0
    },
    imageScrollControlsContainer: {
        margin: '0 auto'
    }
}