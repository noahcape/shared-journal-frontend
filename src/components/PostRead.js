import React from "react"
import { Card, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

class PostRead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            images: this.props.post.images,
            zoomImage: false,
            isMobile: window.innerWidth < 435
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
            this.state.images.map((image, index) => {
                return (
                    <img style={this.state.zoomImage ? (index === this.state.counter ? (styles.imageScrollZoomActive) : (styles.imageScrollZoom)) : (index === this.state.counter ? (styles.imageScrollNonZoomActive) : (styles.imageScrollNonZoom))} src={image} alt={image} key={index} onClick={() => this.zoom()} />
                )
            })
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

        if (date.getTimezoneOffset() > 0) {
            date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        }

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        return (
            `${date.getDate()} ~ ${months[date.getMonth()]} ~ ${date.getFullYear()}`
        )
    }

    render() {
        return (
            <Card style={!this.state.isMobile ? styles.postStyle : {}} actions={[
                <EditOutlined key='edit' onClick={() => this.props.changeEditState()} />,
                <Popconfirm title="Are you sure to delete this post?" onConfirm={() => this.props.deletePost()} okText="Yes" cancelText="No">
                    <DeleteOutlined key='delete' />
                </Popconfirm>
            ]}>
                {this.state.images && this.props.post.images.length > 1 ? (
                    <div style={styles.imageScrollContainer}>
                        <button style={styles.imageScrollControlsLeft} onClick={this.decrementCounter}>{"<"}</button>
                        {this.renderImage()}
                        <button style={styles.imageScrollControlsRight} onClick={this.incrementCounter}>{">"}</button>
                    </div>
                ) : (
                        this.state.images && this.props.post.images[0] && <img style={this.state.zoomImage ? (styles.imageZoom) : (styles.imageNonZoom)} src={this.props.post.images[0]} alt="preview" onClick={() => this.zoom()} />
                    )}
                <p style={styles.postText}>{this.props.post.text}</p>
                <p style={styles.postDate}>{this.getDate()}</p>
            </Card>
        )
    }
}

export default PostRead

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