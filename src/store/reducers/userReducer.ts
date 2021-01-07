import { UserDispatchTypes, REGISTER_USER, LOGIN_USER, CHECK_USER_SIGNED_IN, LOGOUT, GET_USER, EDIT_DISPLAY_NAME } from "../actions/userActionTypes"

interface DefaultStateI {
    token: string,
    journalName: string,
    id: string,
    valid: boolean
}

const defaultState: DefaultStateI = {
    token: '',
    journalName: '',
    id: '',
    valid: false
}

const userReducer = (state: DefaultStateI = defaultState, action: UserDispatchTypes): DefaultStateI => {
    switch (action.type) {
        case REGISTER_USER: 
            return {
                ...state,
                journalName: action.payload.displayName
            }

        case LOGIN_USER:
            return {
                ...state,
                token: action.payload.token,
                id: action.payload.user.id,
                journalName: action.payload.user.journalName
            }

        case CHECK_USER_SIGNED_IN:
            return {
                ...state,
                valid: action.payload
            }

        case LOGOUT:
            return {
                token: '',
                journalName: '',
                id:  '',
                valid: false
            }

        case GET_USER:
            return {
                ...state,
                journalName: action.payload.journalName,
                id: action.payload.id
            }

        case EDIT_DISPLAY_NAME:
            return {
                ...state,
                journalName: action.payload
            }

        default:
            return state
    }
}

export default userReducer