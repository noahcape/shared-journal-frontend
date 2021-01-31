export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const DELETE_POST_SUCESS = 'DELETE_POST_SUCESS'
export const POST_LOADING = 'POST_LOADING'
export const POST_FAIL = 'POST_FAIL'
export const CLEAN_STATE = 'CLEAN_STATE'

export type PostType = {
    text: string,
    images: string[],
    image_keys: string[],
    date: Date,
    month: number,
    year: number,
    user: string,
    likes?: number,
    _id: string
}

export interface PostFail {
    type: typeof POST_FAIL
}

export interface PostLoading {
    type: typeof POST_LOADING
}

export interface GetPostsSuccess {
    type: typeof GET_POSTS_SUCCESS,
    payload: PostType[]
}

export interface AddPostSuccess {
    type: typeof ADD_POST_SUCCESS,
    payload: PostType
}

export interface EditPostSuccess {
    type: typeof EDIT_POST_SUCCESS,
    payload: PostType
}

export interface DeletePostSuccess {
    type: typeof DELETE_POST_SUCESS,
    payload: string
}

export interface CleanState {
    type: typeof CLEAN_STATE
}

export type PostDispatchTypes = PostFail | PostLoading | GetPostsSuccess | AddPostSuccess | EditPostSuccess | DeletePostSuccess | CleanState