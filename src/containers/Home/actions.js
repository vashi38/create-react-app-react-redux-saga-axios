import { INITIALIZE_STATE, SELECT_SHOW } from "./constants";

export function initializeState(shows) {
    return {
        type: INITIALIZE_STATE,
        shows,
    }
}

export function selectShow(selectedShowId, currentItem = null) {
    return {
        type: SELECT_SHOW,
        currentItem,
        selectedShowId,
    }
}


