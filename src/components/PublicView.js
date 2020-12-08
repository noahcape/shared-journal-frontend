import React, { useState, useEffect } from "react";
import postsAPI from "../API/posts.api"
import PublicViewPost from "./PublicViewPost"
import "../publicView.css"

const PublicView = (props) => {
    const [posts, setPosts] = useState()
    const [dateOptions, setDateOptions] = useState({})
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        let isCancelled = false;

        const getPosts = async () => {
            await postsAPI.publicGetPosts(props.match.params.journalName, month, year).then(res => {
                if (!isCancelled) {
                    setPosts(res.data)
                }
            })
        }

        const getDateOptions = async () => {
            await postsAPI.publicGetDateOptions(props.match.params.journalName).then(res => {
                if (!isCancelled) {
                    setDateOptions(res.data)
                }
            })
        }

        getPosts()
        getDateOptions()

        return () => isCancelled = false
    }, [year, month, props.match.params.journalName])

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

    const renderPosts = () => {
        return posts && posts.map((post, index) => {
            return (
                <div className="grid-item" key={index} style={{ "gridTemplateColumns": "2fr" }}>
                    <PublicViewPost className="post-info" post={post} />
                </div>
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

    return (
        <div>
            <div className="public-view-header-n-options">
                <h1>{props.match.params && props.match.params.journalName.replace("_", " ")}</h1>
                <span className="public-view-options">
                    See posts from
                    <select onChange={(e) => handleChange(e)}>
                        <option defaultValue={undefined + "," + undefined}>all</option>
                        {renderDateOptions()}
                    </select>
                </span>
            </div>


            <span className="public-view-post-header">{!year ? (<h1>All Posts</h1>) : (<h1>{`Posts from ${months[month]} ${year}`}</h1>)}</span>

            <div className="grid-container">

                {renderPosts()}
            </div>

        </div>
    )
}

export default PublicView;