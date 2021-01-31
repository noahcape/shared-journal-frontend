import store from '../store'

export const getToken = () => {
    return store.getState().userData.token 
}

export const getJournalName = () => {
    return store.getState().userData.journalName
}

export const getIsValid = () => {
    return store.getState().userData.valid
}

export const getUser = () => {
    return store.getState().userData.id
}

