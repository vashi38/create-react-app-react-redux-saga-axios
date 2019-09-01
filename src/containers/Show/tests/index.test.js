import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { configureHistory } from '../../../configureHistory';
import configureStore from '../../../utilities/store';

import HomePage from '../../Home';
import ShowPage, { mapDispatchToProps } from '../';
import { selectShow } from '../../Home/actions';

const browserHistory = configureHistory();

describe('<show>', () => {
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
                children={ShowPage}
              />
          </Provider>,
        );
        expect(firstChild).toMatchSnapshot();
    });

    it('handleChangeSelectedShow should be defined', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.handleChangeSelectedShow).toBeDefined();
    })

    it('should dispatch handleChangeSelectedShow when called with correct values', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.handleChangeSelectedShow(1, {});
      expect(dispatch).toHaveBeenCalledWith(selectShow(1, {}));
  });

})