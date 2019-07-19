import React from 'react';
import { Route, Switch } from 'react-router-dom';

function ReactRouteConfig({ routes, store }) {
    function renderRoutes(routes, path) {
        return (
            <div>
                <Switch>
                    {routes.map((item, index) => (
                        <Route
                        key={index} 
                        path={`${path}/${item.path}`.replace(/\/\//g, '/')} 
                        exact={!!item.exact}
                        render={
                            (props) => {
                                const { match } = props;
                                if (typeof item.onEnter === 'function') {
                                    item.onEnter(store);
                                }
                                if(item.childRoutes) {
                                    return (
                                        <item.component {...props} route={item} store={store} >
                                            {renderRoutes(item.childRoutes, match.path)}
                                        </item.component>
                                    );
                                }
                                return <item.component {...props} route={item} />
                            }
                        }
                        > 
                        </Route>
                    ))}
                </Switch>
            </div>
        );
    }
    return renderRoutes(routes, '/');
}

export default ReactRouteConfig;
