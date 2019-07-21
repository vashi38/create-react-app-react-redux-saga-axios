import Component1 from "../../components/component1";
import Component2 from "../../components/component2";
import Component3 from "../../components/component3";
import Home from '../../containers/Home/index';
import { getHooks } from '../hooks';
export default function (store: any) {
    const { injectReducer, injectSagas } = getHooks(store)
    return [
        {
            path: '',
            component: Home,
            test1: 'shivanand',
            test2: 'sonnad',
            onEnter: () => {
                const loadFiles = Promise.all([
                    import('../../containers/Home/reducer'),
                    import('../../containers/Home/sagas'),
                ]);
                return loadFiles.then(([HomeReducer, HomeSagas]) => {
                    injectReducer('Home', HomeReducer.default);
                    injectSagas(HomeSagas.default);
                })
            },
            childRoutes: [
                {
                    path: 'component1',
                    component: Component1,
                    test1: 'shivanand',
                    test2: 'sonnad',
                    onEnter: () => {
                        console.log('here2')
                    },
                    childRoutes: [
                        {
                            path: 'component2',
                            component: Component2,
                            test1: 'shivanand',
                            test2: 'sonnad',
                            onEnter: () => {
                                console.log('here31')
                            },
                            childRoutes: [
                                {
                                    path: 'component3',
                                    component: Component3,
                                    test1: 'shivanand',
                                    test2: 'sonnad',
                                    onEnter: () => {
                                        console.log('here32')
                                    },
                                    childRoutes: [
                                        {
                                            path: 'component4',
                                            component: Component1,
                                            test1: 'shivanand',
                                            test2: 'sonnad',
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        },
    ];
}