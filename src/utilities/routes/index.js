import { getHooks } from '../hooks';
import ShowsBreadcrumb from '../../containers/Breadcrumbs/ShowsBreadcrumb';
import ShowBreadcrumb from '../../containers/Breadcrumbs/ShowBreadcrumb';
import SummaryBreadcrumb from '../../containers/Breadcrumbs/SummaryBreadcrumb';

export const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
};

export const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function (store) {
    const { injectReducer } = getHooks(store);
    return {
        path: '/',
        indexRoute: {
            onEnter(nextState, replace) {
                replace('/shows');
            },
        },
        getComponent(nextState, cb) {
            const importModules = Promise.all([
                import('../../containers/Home/reducer'),
                import ('../../containers/Home'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([HomeReducer, HomeComponent]) => {
                injectReducer('app', HomeReducer.default);

                renderRoute(HomeComponent);
            });

            importModules.catch(errorLoading);
        },
        childRoutes: [
            {
                path: 'shows',
                breadcrumbs: [ShowsBreadcrumb],
                getComponent(nextState, cb) {
                    const importModules = Promise.all([
                        import ('../../containers/Shows'),
                    ]);

                    const renderRoute = loadModule(cb);

                    importModules.then(([ShowsComponent]) => {
                        renderRoute(ShowsComponent);
                    });

                    importModules.catch(errorLoading);
                },
            },
            {
                path: 'shows/:showId',
                breadcrumbs: [ShowsBreadcrumb, ShowBreadcrumb],
                getComponent(nextState, cb) {
                    const importModules = Promise.all([
                        import ('../../containers/Show/index'),
                    ]);

                    const renderRoute = loadModule(cb);

                    importModules.then(([ShowComponent]) => {
                        renderRoute(ShowComponent);
                    });

                    importModules.catch(errorLoading);
                },
            },
            {
                path: 'shows/:showId/summary',
                breadcrumbs: [ShowsBreadcrumb, ShowBreadcrumb, SummaryBreadcrumb],
                getComponent(nextState, cb) {
                    const importModules = Promise.all([
                        import ('../../containers/Summary/index'),
                    ]);

                    const renderRoute = loadModule(cb);

                    importModules.then(([SummaryComponent]) => {
                        renderRoute(SummaryComponent);
                    });

                    importModules.catch(errorLoading);
                },
            },
            {
                path: 'shows/:showId/book',
                breadcrumbs: [ShowsBreadcrumb, ShowBreadcrumb, SummaryBreadcrumb],
                getComponent(nextState, cb) {
                    const importModules = Promise.all([
                        import ('../../containers/BookTickets/index'),
                    ]);

                    const renderRoute = loadModule(cb);

                    importModules.then(([BookTicketsComponent]) => {
                        renderRoute(BookTicketsComponent);
                    });

                    importModules.catch(errorLoading);
                },
            },
            {
                path: 'totalRevenue',
                breadcrumbs: [ShowsBreadcrumb],
                getComponent(nextState, cb) {
                    const importModules = Promise.all([
                        import ('../../containers/TotalRevenue/index'),
                    ]);

                    const renderRoute = loadModule(cb);

                    importModules.then(([TotalRevenueComponent]) => {
                        renderRoute(TotalRevenueComponent);
                    });

                    importModules.catch(errorLoading);
                },
            }
        ]
    };
}