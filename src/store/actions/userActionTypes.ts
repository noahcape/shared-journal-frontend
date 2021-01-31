export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const CHECK_USER_SIGNED_IN = 'CHECK_USER_SIGNED_IN' 
export const LOGOUT = 'LOGOUT'
export const GET_USER = 'GET_USER'
export const EDIT_DISPLAY_NAME = 'EDIT_DISPLAY_NAME'

export interface RegisterUser {
    type: typeof REGISTER_USER,
    payload: {
        displayName: string
    }
}

export interface LoginUser {
    type: typeof LOGIN_USER,
    payload: {
        token: string,
        user: {
            id: string,
            journalName: string
        }
    }
}

export interface CheckUserSignedIn {
    type: typeof CHECK_USER_SIGNED_IN,
    payload: boolean
}

export interface LogOut {
    type: typeof LOGOUT
}

export interface GetUser {
    type: typeof GET_USER,
    payload: {
        journalName: string,
        id: string
    }
}

export interface EditDisplayName {
    type: typeof EDIT_DISPLAY_NAME,
    payload: string
}

export type UserDispatchTypes = RegisterUser | LoginUser | CheckUserSignedIn | LogOut | GetUser | EditDisplayName