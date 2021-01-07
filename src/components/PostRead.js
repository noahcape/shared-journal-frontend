import React, { useState } from "react"
import { Card, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from "react-redux"
import { deletePost } from '../store/actions/postActions'

const PostRead = ({ post, deletePost, changeEditState }) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [counter, setCounter] = useState(0)
    const [images] = useState(post.images)
    const [zoomImage, setZoomImage] = useState(false)
    const isMobile = window.innerWidth < 435

    const renderImage = () => {
        return images.map((image, index) => {
            return (
                <img style={zoomImage ? (index === counter ? (styles.imageScrollZoomActive) : (styles.imageScrollZoom)) : (index === counter ? (styles.imageScrollNonZoomActive) : (styles.imageScrollNonZoom))} src={image} alt={image} key={index} onClick={() => setZoomImage(!zoomImage)} />
            )
        })
    }

    const getDate = () => {
        const date = new Date(post.date)

        if (date.getTimezoneOffset() > 0) { date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000) }

        return (
            `${date.getDate()} ~ ${months[date.getMonth()]} ~ ${date.getFullYear()}`
        )
    }

    return (
        <Card style={!isMobile ? styles.postStyle : {}} actions={[
            <EditOutlined key='edit' onClick={() => changeEditState()} />,
            <Popconfirm title="Are you sure to delete this post?" onConfirm={() => deletePost(post._id)} okText="Yes" cancelText="No">
                <DeleteOutlined key='delete' />
            </Popconfirm>
        ]}>
            {images && post.images.length > 1 ? (
                <div style={styles.imageScrollContainer}>
                    <button style={styles.imageScrollControlsLeft} onClick={() => { counter === 0 ? setCounter(images.length - 1) : setCounter(counter - 1) }}>{"<"}</button>
                    {renderImage()}
                    <button style={styles.imageScrollControlsRight} onClick={() => { counter === images.length - 1 ? setCounter(0) : setCounter(counter + 1) }}>{">"}</button>
                </div>
            ) : (
                    images && post.images[0] && <img style={zoomImage ? (styles.imageZoom) : (styles.imageNonZoom)} src={post.images[0]} alt="preview" onClick={() => setZoomImage(!zoomImage)} />
                )}
            <p style={styles.postText}>{post.text}</p>
            <p style={styles.postDate}>{getDate()}</p>
        </Card>
    )
}

export default connect(null, { deletePost })(PostRead)

const styles = {
    postStyle: {
        marginRight: 50,
        marginLeft: 50,
    },
    postText: {
        whiteSpace: 'pre-wrap',
        paddingRight: 15,
    },
    postDate: {
        fontSize: 12,
    },
    imageNonZoom: {
        float: 'left',
        borderRadius: 4,
        margin: '3px 15px 15px 15px',
        maxWidth: '25%',
        maxHeight: 300,
        width: 'auto',
        height: 'auto',
        cursor: 'zoom-in'
    },
    imageZoom: {
        float: 'left',
        borderRadius: 4,
        margin: '3px 15px 15px 15px',
        maxWidth: '45%',
        maxHeight: 600,
        width: 'auto',
        height: 'auto',
        cursor: 'zoom-out'
    },
    imageScrollZoomActive: {
        position: 'relative',
        float: 'left',
        borderRadius: 4,
        margin: '3px 15px 15px 15px',
        maxWidth: 600,
        maxHeight: 600,
        width: 'auto',
        height: 'auto',
        cursor: 'zoom-out'
    },
    imageScrollNonZoomActive: {
        position: 'relative',
        float: 'left',
        borderRadius: 4,
        margin: '3px 15px 15px 15px',
        maxWidth: 300,
        maxHeight: 300,
        width: 'auto',
        height: 'auto',
        cursor: 'zoom-in'

    },
    imageScrollZoom: {
        opacity: 0,
        position: 'fixed',
        float: 'left',
        width: 0,
        height: 0,
    },
    imageScrollNonZoom: {
        opacity: 0,
        position: 'fixed',
        float: 'left',
        width: 0,
        height: 0
    },
    imageScrollContainer: {
        display: 'flex',
        float: 'left',
        marginRight: 15
    },
    imageScrollControlsRight: {
        border: 'none',
        backgroundColor: 'rgb(255, 255, 255)',
        outline: 'none',
        cursor: 'pointer',
        padding: 0,
        margin: 0
    },
    imageScrollControlsLeft: {
        float: 'left',
        border: 'none',
        backgroundColor: 'rgb(255, 255, 255)',
        outline: 'none',
        cursor: 'pointer',
        padding: 0,
        margin: 0
    }
}