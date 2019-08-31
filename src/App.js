import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './utilities/store';
import {
  applyRouterMiddleware,
  Router,
} from 'react-router';
import './utilities/css/global.scss';

import {
  syncHistoryWithStore,
} from 'react-router-redux';
import useScroll from 'react-router-scroll';

import routes from './utilities/routes';
import { configureHistory } from './configureHistory';
import { selectLocationState } from './containers/Home/selectors';
// import { getAdgroup } from './containers/Home/sagas';

const browserHistory = configureHistory();

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});
const rootRoute = routes(store);
function App() {
  return (
    <Provider store={store}>
      <Router
        history={history}
        routes={rootRoute}
        render={
          // Scroll to top when going to a new page, imitating default browser
          // behaviour
          applyRouterMiddleware(useScroll())
        }
      />
    </Provider>
  );
}

export default App;
