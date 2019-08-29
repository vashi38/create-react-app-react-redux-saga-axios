import { fromJS } from "immutable";
import { INITIALIZE_STATE, SELECT_SHOW } from "./constants";

const initialState = fromJS({
    shows: [],
    currentSelectedShow: {},
    currentSelectedShowId: 0,
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
            const currentSelectedShowIdFromState = state.get('currentSelectedShowId');
            const currentSelectedShowIndexFromState = showsFromState.findIndex(show => show.id === currentSelectedShowIdFromState);

            const showsWithoutCurrentShow = [
                ...showsFromState.slice(0, currentSelectedShowIndexFromState),
                ...showsFromState.slice(currentSelectedShowIndexFromState + 1),
            ];
            const updatedShowsList = [
                ...showsWithoutCurrentShow,
                action.currentItem || showsFromState[currentSelectedShowIndexFromState]
            ];

            updatedShowsList.sort((a, b) => a.id - b.id);
            const selectedShowIndexFromShows = updatedShowsList && updatedShowsList.findIndex(item => item.id === action.selectedShowId);
            
            console.log(showsWithoutCurrentShow, updatedShowsList, selectedShowIndexFromShows);
            if (selectedShowIndexFromShows >= 0) {
                return state.set('shows', updatedShowsList)
                        .set('currentSelectedShow', updatedShowsList[selectedShowIndexFromShows])
                        .set('currentSelectedShowId', updatedShowsList[selectedShowIndexFromShows].id);
            }
            return state;
        }
        default: return state;
    }
}
