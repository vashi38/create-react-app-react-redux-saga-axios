import { fromJS } from "immutable";
import { INITIALIZE_STATE, SELECT_SHOW, SET_BREADCRUMBS } from "./constants";

const initialState = fromJS({
    shows: [],
    currentSelectedShow: {},
    currentSelectedShowId: 0,
    breadcrumbs: [],
});

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_STATE: {
            return state.set('shows', action.shows)
                        .set('currentSelectedShow', action.shows[0])
                        .set('currentSelectedShowId', action.shows[0].id);
        }
        case SELECT_SHOW: {
            const showsFromState = state.get('shows');
            const selectedShowIndexFromShows = showsFromState && showsFromState.findIndex(item => item.id === action.selectedShowId);
            if (selectedShowIndexFromShows >= 0) {
                return state.set('currentSelectedShow', showsFromState[selectedShowIndexFromShows])
                        .set('currentSelectedShowId', showsFromState[selectedShowIndexFromShows].id);
            }
            return state;
        }
        case SET_BREADCRUMBS: {
            return state.set('breadcrumbs', action.list);
        }
        default: return state;
    }
}
