import React, { useState } from "react"
import { Typography, Spin, Input, Card } from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import ImagePreview from "./ImagePreview"
import { connect } from 'react-redux'
import { editPost } from '../store/actions/postActions'

const { Text } = Typography
const { TextArea } = Input

const PostEdit = ({ editPost, post, changeEditState }) => {
    const date = `${new Date(post.date).getFullYear()}-${(new Date(post.date).getMonth() + 1 + "").length === 1 ? ((new Date(post.date).getMonth() + 1 + "").padStart(2, 0)) : (new Date(post.date).getMonth() + 1)}-${(new Date(post.date).getDate() + 1 + "").length === 1 ? ((new Date(post.date).getDate() + 1 + "").padStart(2, 0)) : (new Date(post.date).getDate() + 1)}`
    const [editedText, setEditedTest] = useState(post.text)
    const [deletedImages, setDeletedImages] = useState([])
    const [deletedImageKeys, setDeletedImageKeys] = useState([])
    const [editedDate, setEditedDate] = useState('')
    const [loading, setLoading] = useState(false)

    const submitChanges = () => {
        if (editedText === "") { return (alert("You cannot leave your post without any text")) }

        setLoading(true)
        editPost({ text: editedText, dateTime: editedDate, imagesToDelete: deletedImages, keysToDelete: deletedImageKeys }, post._id).then(() => {
            setLoading(false)
            changeEditState()
        })
    }

    const deleteImage = (image, key) => {
        setDeletedImages(deletedImages.concat([image]))
        setDeletedImageKeys(deletedImageKeys.concat([key]))
    }

    return (
        <Spin spinning={loading}>
            <Card style={styles.cardForm} actions={[
                <CloseCircleOutlined onClick={() => changeEditState()} />,
                <CheckCircleOutlined onClick={() => submitChanges()} />
            ]}>
                {post.images.length === deletedImages.length ? (
                    <div>
                        <TextArea style={styles.postTextArea} name="text" defaultValue={post.text} onChange={(e) => setEditedTest(e.target.value)} placeholder="Add text to your Post" />
                    </div>
                ) : (
                        <div style={{ display: 'flex' }}>
                            <div style={styles.imageFill}>
                                <ImagePreview post={post} images={post.images} deleteImage={deleteImage} />
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