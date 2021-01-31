export const SETTINGS_FAIL = 'SETTINGS_FAIL'
export const SETTINGS_LOADING = 'SETTINGS_LOADING'
export const GET_EDIT_OR_POST_SETTINGS_SUCCESS = 'GET_EDIT_OR_POST_SETTINGS_SUCCESS'

export type SettingsType = {
    journal_name: string,
    recipients: string[],
    user: string,
    _id: string
}

export interface SettingsFail {
    type: typeof SETTINGS_FAIL
}

export interface SettingsLoading {
    type: typeof SETTINGS_LOADING
}

export interface GetEditOrPostSettingsSuccess {
    type: typeof GET_EDIT_OR_POST_SETTINGS_SUCCESS,
    payload: SettingsType
}

export type SettingsDispatchTypes = SettingsFail | SettingsLoading | GetEditOrPostSettingsSuccess