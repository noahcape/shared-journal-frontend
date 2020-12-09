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
            return <div key={index}>
                <PostEditHandler post={post} setReload={setReload} reload={reload} />
            </div>

        });
    };

    return (
        <div>
            <h1>
                {userData.user && userData.user.journalName}
            </h1>
            <PostForm setReload={setReload} reload={reload} />
            {posts && posts[0] ? (
                <>
                    <div className="user-options">
                        <span>
                            See posts from
                            <select onChange={(e) => handleChange(e)}>
                                <option defaultValue={undefined + "," + undefined}>all</option>
                                {renderDateOptions()}
                            </select>
                        </span>

                        {userData.user && <Link to={`/visitor/${userData.user.journalName.replace(" ", "_")}`}>
                            <span className="view-journal-as-visitor-button">View Journal as a visitor</span>
                        </Link>}
                    </div>

                    <div className="home-post-title">{!year ? (<h1>All Posts</h1>) : (<h1>{`Posts from ${months[month]} ${year}`}</h1>)}</div>

                    <div className="grid-container">
                        {renderPosts()}
                    </div>
                </>
            ) : (
                    <h1>You have not Posted. Compose one above ^</h1>
                )}
        </div>

    );
}
