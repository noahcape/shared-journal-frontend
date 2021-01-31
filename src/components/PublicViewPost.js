import React, { useState } from "react"
import { connect } from 'react-redux'
import { likePost } from '../store/actions/postActions'
import { Card, Popconfirm, Input, Tooltip } from 'antd'
import { SmileTwoTone, SmileOutlined } from '@ant-design/icons'

const PublicViewPost = ({ post, likePost }) => {
    const [zoomImage, setZoomImage] = useState(false)
    const [msg, setMsg] = useState('')
    const [counter, setCounter] = useState(0)
    const [isMobile] = useState(window.innerWidth < 435)

    const zoom = () => {
        setZoomImage(!zoomImage)
    }

    const incrementCounter = () => {
        if (counter === post.images.length - 1) {
            setCounter(0)
        } else {
            setCounter(counter + 1)
        }
    }

    const decrementCounter = () => {
        if (counter === 0) {
            setCounter(post.images.legnth - 1)
        } else {
            setCounter(counter - 1)
        }
    }

    const getDate = () => {
        const date = new Date(post.date)

        if (date.getTimezoneOffset() > 0) {
            date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        }

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        return (
            `${date.getDate()} ~ ${months[date.getMonth()]} ~ ${date.getFullYear()}`
        )
    }

    const renderImages = () => {
        return post.images.map((image, index) => {
            return (
                <img style={zoomImage ? (index === counter ? (styles.imageScrollZoomActive) : (styles.imageScrollZoom)) : (index === counter ? (styles.imageScrollNonZoomActive) : (styles.imageScrollNonZoom))} src={image} alt={index} onClick={zoom} key={index} />
            )
        })
    }

    return (
        <Card style={!isMobile ? styles.postStyle : {}} actions={[
            <Popconfirm title={<Input value={msg} placeholder='share a message' onChange={(e) => setMsg(e.target.value)} />} onConfirm={() => likePost(post._id, msg)} okText="Send Like" cancelText="Cancel" icon={<SmileTwoTone twoToneColor='rgb(205, 220, 250)' style={{ fontSize: 20 }} />}>
                <Tooltip title="Add a like and message to this post" placement='bottom'>
                    <SmileOutlined />
                </Tooltip>
            </Popconfirm>
        ]}>
            {post.images.length > 1 ? (
                <div className="post-info">
                    <div style={styles.imageScrollContainer}>
                        <button style={styles.imageScrollControlsLeft} onClick={decrementCounter}>{"<"}</button>
                        {renderImages()}
                        <button style={styles.imageScrollControlsRight} onClick={incrementCounter}>{">"}</button>
                    </div>
                </div>
            ) : (
                    post.images.length !== 0 && <img style={zoomImage ? styles.imageZoom : styles.imageNonZoom} src={post.images[0]} alt="preview" onClick={zoom} />
                )}
            <p style={styles.postText}>{post.text}</p>
            <p style={styles.postDate}>{getDate()}</p>
            {post.likes.length > 0 && post.likes.map((msg, index) => {
                return <Tooltip title={msg} key={index}>
                    <SmileTwoTone twoToneColor='rgb(205, 220, 250)' style={styles.like} />
                </Tooltip>
            })}
        </Card>
    )
}

export default connect(null, { likePost })(PublicViewPost);

const styles = {
    like: {
        margin: 5
    },
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
        maxWidth: 300,
        maxHeight: 300,
        width: 'auto',
        height: 'auto',
        cursor: 'zoom-in'
    },
    imageZoom: {
        float: 'left',
        borderRadius: 4,
        margin: '3px 15px 15px 15px',
        maxWidth: 600,
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