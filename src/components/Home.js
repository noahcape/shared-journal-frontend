import React, { useState, useContext, useEffect } from "react";
import PostForm from "../components/PostForm";
import UserContext from "../context/UserContext"
import postAPI from "../API/posts.api"
import PostEditHandler from "./PostEditHandler"
import { Link } from "react-router-dom";

export default function Home() {
    const { userData } = useContext(UserContext)
    const [posts, setPosts] = useState();
    const [dateOptions, setDateOptions] = useState({})
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [reload, setReload] = useState(false)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [isMobile] = useState(window.innerWidth < 435);


    useEffect(() => {
        let isCancelled = false;

        const getDateOptions = async () => {
            await postAPI.getDateOptions().then(res => {
                if (!isCancelled) {
                    setDateOptions(res.data)
                }
            })
        }

        const getPosts = async () => {
            await postAPI.getPostsBy(month, year).then(res => {
                if (!isCancelled) {
                    setPosts(res.data)
                }
            })
        }

        getPosts();
        getDateOptions();

        return () => {
            isCancelled = true;
        };

    }, [month, year, reload]);

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

    const handleChange = (e) => {
        const vars = e.target.value.split(",")

        if (vars[0] === "undefined") {
            setMonth(undefined)
            setYear(undefined)
        } else {
            setMonth(parseInt(vars[0]))
            setYear(parseInt(vars[1]))
        }
    }

    const renderPosts = () => {
        return posts && posts.map((post, index) => {
            return <div style={styles.postContainer} key={index}>
                <PostEditHandler post={post} setReload={setReload} reload={reload} />
            </div>

        });
    };

    return (
        <div>
            <h1>{userData.user && userData.user.journalName}</h1>
            <PostForm setReload={setReload} reload={reload} />
            {posts && posts[0] ? (
                <>
                    <div style={isMobile ? styles.userOptionsMobile : styles.userOptionsWeb}>
                        <div style={styles.userOptionsDiv}>
                            See posts from
                            <select style={styles.dateOptions} onChange={(e) => handleChange(e)}>
                                <option defaultValue={undefined + "," + undefined}>all</option>
                                {renderDateOptions()}
                            </select>
                        </div>

                        {userData.user && <Link  to={`/visitor/${userData.user.journalName.replace(" ", "_")}`}>
                            <div style={styles.userOptionsDiv}>View Journal as a visitor</div>
                        </Link>}
                    </div>

                    <div className="home-post-title">{!year ? (<h1>All Posts</h1>) : (<h1>{`Posts from ${months[month]} ${year}`}</h1>)}</div>

                    {renderPosts()}
                </>
            ) : (
                    <h1>You have not Posted. Compose one above ^</h1>
                )}
        </div>

    );
}

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
}
