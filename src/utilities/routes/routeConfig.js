import React from 'react';
import { Route, Switch } from 'react-router-dom';

function preCondition(condition, store, WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                initialized: false,
            }
        }

        componentDidMount() {
            if (condition && typeof condition === 'function') {
                condition(this.initialize);
            } else {
                this.initialize();
            }
        }

        initialize = () => {
            this.setState({
                initialized: true,
            });
        }
    
        render() {
            const{ initialized } = this.state;
            if (!initialized) return null;
            return (
                <WrappedComponent {...this.props}> {this.props.children} </WrappedComponent>
            );
        }
    }
 }

function ReactRouteConfig({ routes, store, base='/' }) {
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
                                  routesArray.push(item);
                                  const NewComponent = preCondition(item.onEnter, store, item.component);
                                  if(item.childRoutes) {
                                      return (
                                            <NewComponent {...props} route={item} store={store} routesArray={routesArray} >
                                                {renderRoutes(item.childRoutes, match.path, routesArray)}
                                            </NewComponent>
                                      );
                                  }
                                  return <NewComponent {...props} route={item} store={store} routesArray={routesArray} />
                              }
                          }
                        > 
                        </Route>
                    ))}
                </Switch>
            </div>
        );
    }
    return renderRoutes(routes, base, []);
}

export default ReactRouteConfig;
