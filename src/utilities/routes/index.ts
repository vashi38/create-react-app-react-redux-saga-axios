// import Component1 from "../../components/component1";
// import Component2 from "../../components/component2";
// import Component3 from "../../components/component3";

import { getHooks } from '../hooks';
export default function (store: any) {
    const { injectReducer, injectSagas } = getHooks(store)
    return [
        {
            path: '',
            onEnter: (cb: Function) => {
                const loadFiles = Promise.all([
                    import('../../containers/Home/reducer'),
                    import('../../containers/Home/sagas'),
                    import ('../../containers/Home'),
                ]);
                loadFiles.then(([HomeReducer, HomeSagas, HomeComponent]) => {
                    injectReducer('home', HomeReducer.default);
                    injectSagas(HomeSagas.default);
                    cb(HomeComponent.default);
                })
            },
            childRoutes: [
                {
                    path: 'shows',
                    exact: true,
                    onEnter: (cb: Function) => {
                        const loadFiles = Promise.all([
                            import ('../../containers/Shows'),
                        ]);
                        loadFiles.then(([ShowsComponent]) => {
                            cb(ShowsComponent.default);
                        })
                    }
                },
                {
                    path: 'shows/:showId',
                    exact: true,
                    onEnter: (cb: Function) => {
                        const loadFiles = Promise.all([
                            import ('../../containers/Show/index'),
                        ]);
                        loadFiles.then(([ShowComponent]) => {
                            cb(ShowComponent.default);
                        })
                    },
                },
                {
                    path: 'shows/:showId/summary',
                    exact: true,
                    onEnter: (cb: Function) => {
                        const loadFiles = Promise.all([
                            import ('../../containers/Summary/index'),
                        ]);
                        loadFiles.then(([ShowComponent]) => {
                            cb(ShowComponent.default);
                        })
                    },
                }
            ]
        },
    ];
}