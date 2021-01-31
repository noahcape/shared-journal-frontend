import store from '../store'
import { PostType } from '../actions/postActionTypes'

export const getPostsFromSelector = () => {
    const posts: PostType[] = []

    store.getState().posts.allIds && store.getState().posts.allIds!.forEach(id => posts.push(store.getState().posts.byIds![id]));

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getDateOptions = () => {
    const options: any = {}

    store.getState().posts.allIds && store.getState().posts.allIds!.forEach(id => {
        options[store.getState().posts.byIds![id].year] = []
    })

    store.getState().posts.allIds && store.getState().posts.allIds!.forEach(id => {
        const post: PostType = store.getState().posts.byIds![id]
        if (!options[post.year].includes(post.month)) {
            options[post.year].push(post.month)
        }
    })

    return options
}

export const getPostsBy = (month: number, year: number) => {
    const posts: PostType[] = []

    store.getState().posts.allIds && store.getState().posts.allIds!.forEach(id => posts.push(store.getState().posts.byIds![id]));

    return posts.filter(post => post.month === month && post.year === year)
}