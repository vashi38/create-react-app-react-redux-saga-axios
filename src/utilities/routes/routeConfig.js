import React from 'react';
import { Route, Switch } from 'react-router-dom';

function ReactRouteConfig({ routes, store }) {
    function getPath(item, path) {
        return `${path}/${item.path}`.replace(/\/\//g, '/');
    }
    function renderRoutes(routes, path, routesArray) {
        return (
            <div>
                <Switch>
                    {routes.map((item, index) => (
                        <Route
                          key={index} 
                          path={getPath(item, path)} 
                          exact={!!item.exact}
                          render={
                              (props) => {
                                  const { match } = props;
                                  if (typeof item.onEnter === 'function') {
                                      item.onEnter(store);
                                  }
                                  console.log(routesArray);
                                  routesArray.push(item);
                                  if(item.childRoutes) {
                                      return (
                                          <item.component {...props} route={item} store={store} routesArray={routesArray} >
                                              {renderRoutes(item.childRoutes, match.path, routesArray)}
                                          </item.component>
                                      );
                                  }
                                  return <item.component {...props} route={item} store={store} routesArray={routesArray} />
                              }
                          }
                        > 
                        </Route>
                    ))}
                </Switch>
            </div>
        );
    }
    return renderRoutes(routes, '/', []);
}

export default ReactRouteConfig;
