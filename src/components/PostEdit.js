import React, { useState } from "react"
import { Typography, Spin, Input, Card } from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import ImagePreview from "./ImagePreview"
import postAPI from "../API/posts.api"

const { Text } = Typography
const { TextArea } = Input

export default function PostEdit(props) {
    const [editedText, setEditedTest] = useState(props.post.text)
    const [deletedImages, setDeletedImages] = useState([])
    const [deletedImageKeys, setDeletedImageKeys] = useState([])
    const [editedDate, setEditedDate] = useState(props.post.date.split("T")[0])
    const [loading, setLoading] = useState(false)

    const submitChanges = async (e) => {
        e.preventDefault();

        if (editedText === "") {
            return (alert("You cannot leave your post without any text"))
        }

        postAPI.editPost(props.post._id, editedText).then(
            editedDate === '' ? (
                postAPI.editDate(props.post._id, props.post.date)
            ) : (
                    postAPI.editDate(props.post._id, new Date(editedDate))
                )
        )

        const data = {
            "id": props.post._id,
            "images": deletedImages,
            "keys": deletedImageKeys
        }
        setLoading(true)
        postAPI.deleteImage(data).then(() => {
            setLoading(false)
            props.changeEditState()
        })
    }

    const deleteImage = (image, key, e) => {
        e.preventDefault()

        setDeletedImages(deletedImages.concat([image]))
        setDeletedImageKeys(deletedImageKeys.concat([key]))
    }

    return (
        <Spin spinning={loading}>
            <Card style={styles.cardForm} actions={[
                <CloseCircleOutlined onClick={() => props.changeEditState()} />,
                <CheckCircleOutlined onClick={(e) => submitChanges(e)} />
            ]}>
                {props.post.images.length === deletedImages.length ? (
                    <div>
                        <TextArea style={styles.postTextArea} name="text" defaultValue={props.post.text} onChange={(e) => setEditedTest(e.target.value)} placeholder="Add text to your Post" />
                    </div>
                ) : (
                        <div style={{display: 'flex'}}>
                            <div style={styles.imageFill}>
                                <ImagePreview post={props.post} images={props.post.images} deleteImage={deleteImage} />
                            </div>
                            <TextArea style={styles.postTextArea} name="text" defaultValue={props.post.text} onChange={(e) => setEditedTest(e.target.value)} placeholder="Add text to your Post" />
                        </div>
                    )}
                <div style={styles.dateDiv}>
                    <Text style={{ color: 'rgb(245, 245, 245)', marginRight: 10 }}>Date</Text>
                    <input type='date' style={styles.dateInput} value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />
                </div>
            </Card>
        </Spin>
    )
}

const styles = {
    cardForm: {
        margin: 35,
        paddingRight: 25,
        paddingLeft: 25,
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
        borderRadius: 8,
        marginRight: 25
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
        outline: 'none'
    },
}