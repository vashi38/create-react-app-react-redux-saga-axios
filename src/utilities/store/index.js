import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from '../reducer';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}, history) {
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
        devtools(),
    ];

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        compose(...enhancers)
    );

    store.runSaga = sagaMiddleware.run;


    if (module.hot) {
        const importModules = Promise.all([
            import('../reducer'),
        ]);
        importModules.then(([reducerModule]) => {
            const createReducers = reducerModule.default;
            const nextReducers = createReducers(store.asyncReducers);

            store.replaceReducer(nextReducers);
        });
    }

    store.asyncReducers = {};

    return store;
}