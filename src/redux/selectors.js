 
export const getPostState = store => store.posts

export const getPostList = store =>
    getPostState(store) ? getPostState(store).posts : []

export const getPosts = store =>
    getPostList(store)

export const getFilteredPosts = async (store, month, year) => {
    const posts = getPosts(store)
    console.log(posts, "SELECTOR")
    if (!month && year) {
        return posts.filter(post => post.year === year)
    } else if (month && year) {
        return posts.filter(post => post.year === year && post.month === month)
    } else {
        return posts
    }
}