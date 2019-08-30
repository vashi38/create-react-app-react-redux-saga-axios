import { createSelector } from 'reselect';

const HomeState = () => (state) => state && state['home'];

const selectShows = () => createSelector(
    HomeState(),
    (home) => home ? home.get('shows') : []
);

const selectSelectedCurrentShow = () => createSelector(
    HomeState(),
    (home) => home ? home.get('currentSelectedShow') : {}
);

const selectSelectedCurrentShowId = () => createSelector(
    HomeState(),
    (home) => home ? home.get('currentSelectedShowId') : 0
);

const selectBreadcrumbs = () => createSelector(
    HomeState(),
    (home) => home ? home.get('breadcrumbs') : []
)

export {
    selectShows,
    selectSelectedCurrentShow,
    selectSelectedCurrentShowId,
    selectBreadcrumbs,
};
