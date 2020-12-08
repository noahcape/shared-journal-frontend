import React from "react"

class ImagePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images,
            keys: this.props.post && this.props.post.image_keys,
            counter: 0,
        }

        this.incrementCounter = this.incrementCounter.bind(this)
        this.decrementCounter = this.decrementCounter.bind(this)
        this.renderImage = this.renderImage.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    renderImage = () => {
        return (
            this.state.images.map((image, index) => {
                let style = "image-scroll"

                if (index === this.state.counter) {
                    style += "-active"
                }

                return (
                    this.props.post ? (
                        <img className={style} src={image} alt={image} key={index} />
                    ) : (
                            <img className={style} src={URL.createObjectURL(image)} alt={image} key={index} />
                        )
                )
            })
        )
    }

    incrementCounter = (e) => {
        e.preventDefault()

        if (this.state.counter === (this.state.images.length - 1)) {
            this.setState({
                counter: 0
            })
        } else {
            this.setState({
                counter: this.state.counter + 1
            })
        }

    }

    decrementCounter = (e) => {
        e.preventDefault()

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

    handleDelete = (i, e) => {
        if (this.props.post) {
            const images = this.state.images.filter((value, index, arr) => {
                return value !== this.state.images[i]
            })

            const keys = this.state.keys.filter((value, index, arr) => {
                return value !== this.state.keys[i]
            })

            this.setState({
                counter: 0
            })

            this.props.deleteImage(this.state.images[i], this.state.keys[i], e)

            this.setState({ images: images, keys: keys })

        } else {
            const images = this.state.images.filter((value, index, arr) => {
                return value !== this.state.images[i]
            })

            this.setState({
                counter: 0
            })

            this.props.deleteImage(this.state.images[i], undefined, e)

            this.setState({ images: images })
        }

    }

    render() {
        return (
            this.state.images.length > 0 && <div>
                {this.state.images.length > 1 ? (
                    <div>
                        {this.renderImage()}
                        <p className="image-preview-controls">
                            <button onClick={this.decrementCounter} style={{ float: "left" }}>{"<"}</button>
                            <button onClick={(e) => this.handleDelete(this.state.counter, e)}>X</button>
                            <button onClick={this.incrementCounter} style={{ float: "right" }}>{">"}</button>
                        </p>
                    </div>
                ) : (
                        <div>
                            {this.props.post ? (
                                <img className="photo-edit-state" src={this.state.images[0]} alt={this.state.images[this.state.counter]} />
                            ) : (
                                    <img src={URL.createObjectURL(this.state.images[0])} alt={this.state.images[this.state.counter]} />
                                )}
                            <p className="image-preview-control">
                                <button onClick={(e) => this.handleDelete(0, e)}>X</button>
                            </p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ImagePreview