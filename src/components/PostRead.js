import React from "react"
import postsAPI from "../API/posts.api";

class PostRead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            images: undefined,
            zoomImage: false
        }

        this.incrementCounter = this.incrementCounter.bind(this)
        this.decrementCounter = this.decrementCounter.bind(this)
        this.renderImage = this.renderImage.bind(this)
        this.getDate = this.getDate.bind(this)
        this.zoom = this.zoom.bind(this)
    }

    async componentDidUpdate() {
        let isCancelled = false

        await postsAPI.getPost(this.props.post._id).then(res => {
            if (!isCancelled) {
                if (res) {
                    this.setState({
                        images: res.images
                    })
                }
            }
        })

        return () => (isCancelled = true)
    }

    zoom = () => {
        this.setState({
            zoomImage: !this.state.zoomImage
        })
    }

    renderImage = () => {
        return (
            <span className="image">
                <button className="backButton" onClick={this.decrementCounter}>{"<"}</button>
                {this.state.images.map((image, index) => {
                    let style;
                    if (this.state.zoomImage) {
                        style = "zoom-image-scroll"
                    } else {
                        style = "image-scroll"
                    }

                    if (index === this.state.counter) {
                        style += "-active"
                    }

                    return (
                        <img className={style} src={image} alt={image} key={index} onClick={() => this.zoom()} />
                    )
                })}
                <button className="forwardButton" onClick={this.incrementCounter}>{">"}</button>
            </span>
        )
    }

    incrementCounter = () => {
        if (this.state.counter === this.state.images.length - 1) {
            this.setState({
                counter: 0
            })
        } else {
            this.setState({
                counter: this.state.counter + 1
            })
        }

    }

    decrementCounter = () => {
        if (this.state.counter === 0) {
            this.setState({
                counter: this.state.images.length - 1
            })
        } else {
            this.setState({
                counter: this.state.counter - 1
            })
        }
    }

    getDate = () => {
        const date = new Date(this.props.post.date)

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const month = months[date.getMonth()]
        const day = date.getDate()
        const year = this.props.post.year

        return (
            `${day} ~ ${month} ~ ${year}`
        )
    }

    render() {
        return (
            this.state.images ? <>
                {this.props.post.images.length > 1 ? (
                    <div className="post-info">
                        {this.renderImage()}
                        <p className="post-text">
                            {this.props.post.text}
                        </p>
                    </div>
                ) : (
                        this.props.post.images[0] && <div className="post-info">
                            <div className="image">
                                <img className={this.state.zoomImage ? ("zoom-image") : ("non-zoom-image")} src={this.props.post.images[0]} alt="preview" onClick={() => this.zoom()} />
                            </div>
                            <p className="post-text">
                                {this.props.post.text}
                            </p>
                        </div>
                    )}
                {this.props.post.images.length === 0 && <p className="post-text">{this.props.post.text}</p>}
                <button className="post-read-edit-button" type="button" onClick={() => this.props.changeEditState()}>edit</button>
                <button className="post-read-delete-button" type="button" onClick={() => this.props.deletePost()}>delete</button>
                <p className="date">{this.getDate()}</p>
            </> : <></>
        )
    }
}

export default PostRead