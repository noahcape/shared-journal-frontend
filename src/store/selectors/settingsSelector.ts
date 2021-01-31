import store from '../store'

export const getSettingsFromSelector = () => 
    store.getState().settings.settings && store.getState().settings.settings!
