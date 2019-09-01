import homeReducer from '../reducer';
import { fromJS } from 'immutable';
import { shows, Tax } from '../data';
import Show from '../../../classes/Show';

import { initializeState, selectShow } from '../actions';

describe('Home reducer', () => {
    let state;
    let _shows;

    beforeEach(() => {
        state = fromJS({
            shows: [],
            currentSelectedShow: {},
            currentSelectedShowId: 0,
            breadcrumbs: [],
        });
        _shows = shows.map(show => new Show(show.id, show.name, show.seats, Tax));
    })

    it('should return the initial state', () => {
        const expectedResult = state;
        expect(homeReducer(undefined, {})).toEqual(expectedResult);
    })

    it('should handle the initialize state action correctly', () => {
        const expectedResult = _shows;
        expect(homeReducer(undefined, initializeState(_shows)).get('shows')).toEqual(expectedResult);
    })

    it('should handle the select show action correctly', () => {
        const expectedResult = 1;
        const currentState = homeReducer(undefined, initializeState(_shows));
        expect(homeReducer(currentState, selectShow(1)).get('currentSelectedShowId')).toEqual(expectedResult);
    })
    
})