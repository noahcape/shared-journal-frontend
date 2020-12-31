import React, { useState } from "react"

const PublicViewPost = (props) => {
    const [zoomImage, setZoomImage] = useState(false)
    const [counter, setCounter] = useState(0)

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
        return (
            <span className="image">
                <button className="backButton" onClick={decrementCounter}>{"<"}</button>
                {props.post.images.map((image, index) => {
                    let style;
                    if (zoomImage) {
                        style = "zoom-image-scroll"
                    } else {
                        style = "image-scroll"
                    }

                    if (index === counter) {
                        style += "-active"
                    }

                    return (
                        <img className={style} src={image} alt={index} onClick={zoom} key={index} />
                    )
                })}
                <button className="forwardButton" onClick={incrementCounter}>{">"}</button>
            </span>
        )
    }

    return (
        <>
            {props.post.images.length > 1 ? (
                <div className="post-info">
                    {renderImages()}
                    <p className="post-text">
                        {props.post.text}
                    </p>
                </div>
            ) : (
                    <div className="post-info">
                        {props.post.images.length !== 0 && <div className="image">
                            <img className={zoomImage ? ("zoom-image") : ("non-zoom-image")} src={props.post.images[0]} alt="preview" onClick={zoom} />
                        </div>}
                        <p className="post-text">
                            {props.post.text}
                        </p>
                    </div>
                )}
            <p className="date">{getDate()}</p>
        </>
    )
}

export default PublicViewPost;