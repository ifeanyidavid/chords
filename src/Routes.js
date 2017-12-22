import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-router';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <PropsRoute exact to="/" component={Home} auth="auth"/>
      </BrowserRouter>
    )
  }
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    )
}

const PropsRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render={routeProps => {
            renderMergedProps(component, routeProps, rest)
        }} />
    )
}

const PrivateRoute = ({component, redirectTo, ...rest}) => {
    return (
        <Route {...rest} render={routeProps => {
            return auth.LoggedIn() ?
            (
                renderMergedProps(component, routeProps, rest)
            ) :
            (
                <Redirect to={{
                    pathname: redirectTo,
                    state: {from: routeProps.location}
                }} />
            )
        }} />
    )
}