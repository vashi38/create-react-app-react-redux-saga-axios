import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { configureHistory } from '../../../configureHistory';
import configureStore from '../../../utilities/store';

import HomePage, { mapDispatchToProps } from '../';
import { initializeState } from '../actions';

const browserHistory = configureHistory();

describe('<home>', () => {
    let store;
    beforeAll(() => {
        store = configureStore({}, browserHistory);
    })
    it('should render and match the snapshot', () => {
        const {
          container: { firstChild },
        } = render(
          <Provider store={store}>
              <HomePage />
          </Provider>,
        );
        expect(firstChild).toMatchSnapshot();
    });

    describe('initialize state', () => {
        it('should be injected', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            expect(result.initializeState).toBeDefined();
        });

        it('should dispatch loadRepos when called', () => {
            const dispatch = jest.fn();
            const shows = [];
            const result = mapDispatchToProps(dispatch);
            result.initializeState(shows);
            expect(dispatch).toHaveBeenCalledWith(initializeState(shows));
        });
    
    })
})