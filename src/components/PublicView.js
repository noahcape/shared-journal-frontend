import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import PublicViewPost from "./PublicViewPost"
import "../publicView.css"
import { getPostsFromSelector, getDateOptions, getPostsBy } from "../store/selectors/postSelector";
import { publicGetPosts } from "../store/actions/postActions"

const PublicView = (props, { posts, dateOptions, publicGetPosts }) => {
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const isMobile = window.innerWidth < 435

    useEffect(() => {
        localStorage.setItem("auth-token", "")
        publicGetPosts(props.match.params.journalName)
    }, [publicGetPosts, props.match.params.journalName])

    const renderDateOptions = () => {
        return dateOptions && Object.keys(dateOptions).map((year, index) => {
            return (
                <optgroup label={year} value={year} key={index}>
                    {renderMonthOptions(year)}
                </optgroup>
            )
        })
    }

    const renderMonthOptions = (year) => {
        return dateOptions[year] && dateOptions[year].map((month, index) => {
            return <option key={index} value={month + "," + year}>{months[month]}</option>
        })
    }

    const renderAllPosts = () => {
        return posts && posts.map((post, index) => {
            return <div style={styles.postContainer} key={index} >
                <PublicViewPost post={post} />
            </div>
        })
    }

    const renderPostsFromDate = () => {
        return getPostsBy(month, year).map((post, index) => {
            return <div style={styles.postContainer} key={index}>
                <PublicViewPost post={post} />
            </div>
        })
    }

    const handleChange = (e) => {
        const vars = e.target.value.split(",")

        if (vars[0] === "undefined") {
            setMonth('')
            setYear('')
        } else {
            setMonth(parseInt(vars[0]))
            setYear(parseInt(vars[1]))
        }
    }

    return (
        <div>
            <div style={isMobile ? (styles.userOptionsMobile) : (styles.userOptionsWeb)}>
                <div>
                    <h1 style={{ color: 'white', padding: 0, margin: 0 }}>{props.match.params && props.match.params.journalName.split("_").join(" ")}</h1>
                </div>
                <div style={styles.userOptionsDiv}>
                    See posts from
                    <select style={styles.dateOptions} onChange={(e) => handleChange(e)}>
                        <option defaultValue={undefined + "," + undefined}>all</option>
                        {renderDateOptions()}
                    </select>
                </div>
            </div>
            <span className="public-view-post-header">{!year ? (<h1>All Posts</h1>) : (<h1>{`Posts from ${months[month]} ${year}`}</h1>)}</span>
            {!month && !year ? renderAllPosts() : renderPostsFromDate() }
        </div>
    )
}

const mapStateToProps = () => ({
    post: getPostsFromSelector(),
    dateOptions: getDateOptions()
})

export default connect(mapStateToProps, { publicGetPosts })(PublicView)

const styles = {
    postContainer: {
        paddingBottom: 10
    },
    userOptionsWeb: {
        alignItems: 'center',
        borderRadius: 8,
        padding: 15,
        margin: 8,
        color: 'white',
        backgroundColor: 'rgb(47, 88, 183)',
        display: 'flex',
        justifyContent: 'space-between',
    },
    userOptionsMobile: {
        display: 'block',
        borderRadius: 8,
        padding: 15,
        margin: 8,
        color: 'white',
        backgroundColor: 'rgb(47, 88, 183)',
    },
    dateOptions: {
        marginLeft: 5,
        color: 'white',
        border: '3px solid white',
        backgroundColor: 'rgb(129, 139, 249)'
    },
    userOptionsDiv: {
        color: 'white',
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'rgb(129, 139, 249)',
        margin: 5,
    },
}