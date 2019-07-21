import { createSelector } from 'reselect';

const HomeState = () => (state) => state && state['Home'];

const selectHomeState = () => createSelector(
    HomeState(),
    (home) => home ? home.toJS() : {}
);

export {
    selectHomeState,
};
