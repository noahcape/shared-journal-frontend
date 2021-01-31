import { createStore, applyMiddleware } from 'redux'
import Reducer from "./reducers"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const Store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootStore = ReturnType<typeof Reducer>

export default Store