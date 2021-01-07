import { combineReducers } from 'redux'
import postReducer from "./postReducer"
import settingsReducer from './settingsReducer'
import userReducer from './userReducer'

const Reducer = combineReducers({
    posts: postReducer,
    settings: settingsReducer,
    userData: userReducer
})

export default Reducer