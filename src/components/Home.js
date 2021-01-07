import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import PostForm from "../components/PostForm";
import PostEditHandler from "./PostEditHandler"
import { getPosts } from '../store/actions/postActions'
import { getPostsFromSelector, getDateOptions, getPostsBy } from "../store/selectors/postSelector";
import { getUser, getJournalName } from "../store/selectors/userDataSelector";

const Home = ({ posts, dateOptions, user, journalName, getPosts }) => {
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [isMobile] = useState(window.innerWidth < 435);

    useEffect(() => {
        getPosts()
    }, [getPosts])

    const renderDateOptions = () => {
        return dateOptions && Object.keys(dateOptions).map((year, index) => {
            return (
                <optgroup label={year} value={year} key={index}>
                    {dateOptions[year] && dateOptions[year].map((month, index) => {
                        return <option key={index} value={month + "," + year}>{months[month]}</option>
                    })}
                </optgroup>
            )
        })
    }

    const openVisitorPage = () => {
        const url = `https://sharedjournal.capefamily.org/visitor/${journalName.replace(" ", "_")}`;
        window.open(url, '_blank');
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

    const renderAllPosts = () => {
        return posts.map((post, index) => {
            return <div style={styles.postContainer} key={index}>
                <PostEditHandler post={post} />
            </div>
        })
    }

    const renderPostsFromDate = () => {
        return getPostsBy(month, year).map((post, index) => {
            return <div style={styles.postContainer} key={index}>
                <PostEditHandler post={post} />
            </div>
        })
    }

    return (
        <div>
            <h1>{journalName}</h1>
            <PostForm />
            {posts ? (
                <>
                    <div style={isMobile ? styles.userOptionsMobile : styles.userOptionsWeb}>
                        <div style={styles.userOptionsDiv}>
                            See posts from
                            <select style={styles.dateOptions} onChange={(e) => handleChange(e)}>
                                <option defaultValue={undefined + "," + undefined}>all</option>
                                {renderDateOptions()}
                            </select>
                        </div>

                        {user && <span style={styles.pageRedirect} onClick={openVisitorPage}>
                            <div style={styles.userOptionsDiv}>View Journal as a visitor</div>
                        </span>}
                    </div>

                    <div className="home-post-title">{!year ? (posts.length > 0 && <h1>All Posts</h1>) : (<h1>{`Posts from ${months[month]} ${year}`}</h1>)}</div>

                    {!month && !year ? renderAllPosts() : renderPostsFromDate()}
                </>
            ) : (
                    <h1>You have not Posted. Compose one above ^</h1>
                )}
        </div>

    );
}

const mapStateToProps = () => ({
    posts: getPostsFromSelector(),
    dateOptions: getDateOptions(),
    user: getUser(),
    journalName: getJournalName()
})

export default connect(mapStateToProps, { getPosts })(Home)

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
        margin: 5
    },
    pageRedirect: {
        cursor: 'pointer'
    }
}
