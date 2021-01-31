import { PostType, GET_POSTS_SUCCESS, EDIT_POST_SUCCESS, DELETE_POST_SUCESS, ADD_POST_SUCCESS, PostDispatchTypes, POST_FAIL, POST_LOADING, CLEAN_STATE } from "../actions/postActionTypes"

interface DefaultStateI {
    loading: boolean,
    allIds?: string[],
    byIds?: {
        [key: string]: PostType
    }
}

const defaultState: DefaultStateI = {
    loading: false
}

const postReducer = (state: DefaultStateI = defaultState, action: PostDispatchTypes): DefaultStateI => {
    switch (action.type) {
        case POST_FAIL:
            return {
                ...state,
                loading: false
            }

        case POST_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                allIds: action.payload.map(post => {
                    return post._id
                }),
                byIds: action.payload.reduce((o, post) => ({ ...o, [post._id]: post }), {})
            }

        case ADD_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                allIds: [...state.allIds!, action.payload._id],
                byIds: {
                    ...state.byIds!,
                    [action.payload._id]: action.payload
                }
            }

        case DELETE_POST_SUCESS:
            return {
                ...state,
                loading: false,
                allIds: state.allIds!.filter(id => id !== action.payload)
            }

        case EDIT_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                byIds: {
                    ...state.byIds!,
                    [action.payload._id]: action.payload
                }
            }

        case CLEAN_STATE:
            return {
                loading: false,
                allIds: [],
                byIds: {}
            }

        default:
            return state
    }
}

export default postReducer