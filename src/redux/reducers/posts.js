import { ADD_POST, DELETE_POST, EDIT_POST, GET_POSTS } from "../actionTypes"

const initialState = {
    allIds: [],
    byIds: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                allIds: action.payload.forEach(post => {
                    return post._id
                }),
                byIds: action.payload.reduce((o, post) => ({ ...o, [post._id]: post }), {})
            }

        case ADD_POST:
            return {
                ...state,
                allIds: [...state.allIds, action.payload._id],
                byIds: {
                    ...state.byIds,
                    [action.payload._id]: action.payload
                }
            }

        case DELETE_POST:
            return {
                ...state,
                allIds: state.allIds.filter(id => id !== action.payload._id)
            }

        case EDIT_POST:
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [action.payload._id]: action.payload
                }
            }

        default:
            return state;
    }
}