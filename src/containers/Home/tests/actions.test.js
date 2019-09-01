import { INITIALIZE_STATE, SELECT_SHOW } from '../constants';
import { shows, Tax } from '../data';
import Show from '../../../classes/Show';

import { initializeState, selectShow } from '../actions';

describe('Home actions', () => {
    let _shows;

    beforeEach(()=> {
        _shows = shows.map(show => new Show(show.id, show.name, show.seats, Tax));
    });

    it('should return correct type and shows passed',() => {
        const expectedResults = {
            type: INITIALIZE_STATE,
            shows: _shows,
        };
        expect(initializeState(_shows)).toEqual(expectedResults);
    });

    it('should return the correct type and select show id', () => {
        const expectedResults = {
            type: SELECT_SHOW,
            selectedShowId: 1,
            currentItem: {},
        };
        expect(selectShow(1, {})).toEqual(expectedResults);
    })

})