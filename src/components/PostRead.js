import React from "react"

class PostRead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            images: this.props.post.images,
            zoomImage: false
        }

        this.update = true
        this.incrementCounter = this.incrementCounter.bind(this)
        this.decrementCounter = this.decrementCounter.bind(this)
        this.renderImage = this.renderImage.bind(this)
        this.getDate = this.getDate.bind(this)
        this.zoom = this.zoom.bind(this)
    }

    componentDidMount() {
        if (this.update) {
            this.setState({
                images: this.props.post.images
            })
        }
    }

    componentWillUnmount() {
        this.update = false
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

        if(date.getTimezoneOffset() > 0){
            date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 );
        }

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        return (
            `${date.getDate()} ~ ${months[date.getMonth()]} ~ ${date.getFullYear()}`
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