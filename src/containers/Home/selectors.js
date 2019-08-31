import { createSelector } from 'reselect';

const HomeState = () => (state) => state.get('app');

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

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectShows,
    selectSelectedCurrentShow,
    selectSelectedCurrentShowId,
    selectBreadcrumbs,
    selectLocationState,
};
