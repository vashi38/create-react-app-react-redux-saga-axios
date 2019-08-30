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
            console.log('object');
            return state.set('shows', action.shows)
                        .set('currentSelectedShow', action.shows[0])
                        .set('currentSelectedShowId', action.shows[0].id);
        }
        case SELECT_SHOW: {
            const showsFromState = state.get('shows');
            // const currentSelectedShowIdFromState = state.get('currentSelectedShowId');
            // const currentSelectedShowIndexFromState = showsFromState.findIndex(show => show.id === currentSelectedShowIdFromState);

            // const showsWithoutCurrentShow = [
            //     ...showsFromState.slice(0, currentSelectedShowIndexFromState),
            //     ...showsFromState.slice(currentSelectedShowIndexFromState + 1),
            // ];
            // const updatedShowsList = [
            //     ...showsWithoutCurrentShow,
            //     action.currentItem || showsFromState[currentSelectedShowIndexFromState]
            // ];

            // updatedShowsList.sort((a, b) => a.id - b.id);
            const selectedShowIndexFromShows = showsFromState && showsFromState.findIndex(item => item.id === action.selectedShowId);
            
            if (selectedShowIndexFromShows >= 0) {
                return state
                        .set('currentSelectedShow', showsFromState[selectedShowIndexFromShows])
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
