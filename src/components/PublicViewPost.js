import React, { useState } from "react"
import { Card } from 'antd'
// import { SmileTwoTone, SmileOutlined } from '@ant-design/icons'

const PublicViewPost = (props) => {
    const [zoomImage, setZoomImage] = useState(false)
    const [counter, setCounter] = useState(0)
    const [isMobile] = useState(window.innerWidth < 435)
    // const [likes, setLikes] = useState(Math.floor(1 + Math.random() * (7 - 1)))

    const zoom = () => {
        setZoomImage(!zoomImage)
    }

    const incrementCounter = () => {
        if (counter === props.post.images.length - 1) {
            setCounter(0)
        } else {
            setCounter(counter + 1)
        }
    }

    const decrementCounter = () => {
        if (counter === 0) {
            setCounter(props.post.images.legnth - 1)
        } else {
            setCounter(counter - 1)
        }
    }

    const getDate = () => {
        const date = new Date(props.post.date)

        if (date.getTimezoneOffset() > 0) {
            date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        }

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        return (
            `${date.getDate()} ~ ${months[date.getMonth()]} ~ ${date.getFullYear()}`
        )
    }

    const renderImages = () => {
        return props.post.images.map((image, index) => {
            return (
                <img style={zoomImage ? (index === counter ? (styles.imageScrollZoomActive) : (styles.imageScrollZoom)) : (index === counter ? (styles.imageScrollNonZoomActive) : (styles.imageScrollNonZoom))} src={image} alt={index} onClick={zoom} key={index} />
            )
        })
    }

    return (
        <Card style={!isMobile ? styles.postStyle : {}}>
            {props.post.images.length > 1 ? (
                <div className="post-info">
                    <div style={styles.imageScrollContainer}>
                        <button style={styles.imageScrollControlsLeft} onClick={decrementCounter}>{"<"}</button>
                        {renderImages()}
                        <button style={styles.imageScrollControlsRight} onClick={incrementCounter}>{">"}</button>
                    </div>
                </div>
            ) : (
                    props.post.images.length !== 0 && <img style={zoomImage ? styles.imageZoom : styles.imageNonZoom} src={props.post.images[0]} alt="preview" onClick={zoom} />
                )}
            <p style={styles.postText}>{props.post.text}</p>
            <p style={styles.postDate}>{getDate()}</p>
            {/* {likes > 0 && Array(likes).fill(1).map((i, index) => { return <SmileTwoTone twoToneColor='rgb(84, 177, 227)' key={index} style={styles.like} /> })} */}
        </Card>
    )
}

export default PublicViewPost;

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