import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { configureHistory } from '../../../configureHistory';
import configureStore from '../../../utilities/store';

import HomePage from '../../Home';
import TotalRevenuePage from '../';

const browserHistory = configureHistory();

describe('<TotalRevenue>', () => {
    let store;
    beforeAll(() => {
        store = configureStore({}, browserHistory);
    })
    it('should render and match the snapshot', () => {
        const {
          container: { firstChild },
        } = render(
          <Provider store={store}>
              <HomePage 
                children={TotalRevenuePage}
              />
          </Provider>,
        );
        expect(firstChild).toMatchSnapshot();
    });
})