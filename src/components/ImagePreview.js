import React from "react"
import { DeleteOutlined } from "@ant-design/icons"

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
                return (
                    this.props.post ? (
                        <img style={index === this.state.counter ? styles.imageScrollActive : styles.imageScroll} src={image} alt={image} key={index} />
                    ) : (
                            <img style={index === this.state.counter ? styles.imageScrollActive : styles.imageScroll} src={URL.createObjectURL(image)} alt={image} key={index} />
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
                    <div style={styles.imageScrollControlsContainer}>
                        <div style={styles.imageScrollContainer}>
                            <button onClick={this.decrementCounter} style={styles.imageScrollControls}>{"<"}</button>
                            {this.renderImage()}
                            <button onClick={this.incrementCounter} style={styles.imageScrollControls}>{">"}</button>
                        </div>
                        <DeleteOutlined onClick={(e) => this.handleDelete(this.state.counter, e)} />
                    </div>
                ) : (
                        <div style={styles.imageScrollControlsContainer}>
                            <div style={styles.imageScrollContainer}>
                                {this.props.post ? (
                                    <img style={styles.image} src={this.state.images[0]} alt={this.state.images[this.state.counter]} />
                                ) : (
                                        <img src={URL.createObjectURL(this.state.images[0])} style={styles.image} alt={this.state.images[this.state.counter]} />
                                    )}
                            </div>
                            <DeleteOutlined onClick={(e) => this.handleDelete(this.state.counter, e)} />
                        </div>
                    )
                }
            </div>
        )
    }
}

const styles = {
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

export default ImagePreview