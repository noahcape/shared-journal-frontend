import { SettingsDispatchTypes, SettingsType, SETTINGS_FAIL, SETTINGS_LOADING, GET_EDIT_OR_POST_SETTINGS_SUCCESS } from "../actions/settingsActionsTypes"

interface DefaultStateI {
    loading: boolean,
    settings?: SettingsType
}

const defaultState: DefaultStateI = {
    loading: false
}

const settingsReducer = (state: DefaultStateI = defaultState, action: SettingsDispatchTypes): DefaultStateI => {
    switch (action.type) {
        case SETTINGS_FAIL:
            return {
                ...state,
                loading: false
            }

        case SETTINGS_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_EDIT_OR_POST_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: action.payload
            }


        default:
            return state
    }
}

export default settingsReducer