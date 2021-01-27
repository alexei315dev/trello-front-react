import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";
import axios from './util/Api';
import Login from './pages/auth/Login';
import Board from './pages/Board';
import {
    getUser,
    setInitUrl,
} from "./actions";

const RestrictedRoute = ({ component: Component, token, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                token ?
                    <Component {...props} />
                    : <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />}
        />
    );
};
class ProtectedPages extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="page-container" className="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed page-header-dark page-header-glass main-content-narrow">
                    <main id="main-container">
                        <Switch>
                            <Redirect exact path='/pr' to="/pr/board" />
                            <RestrictedRoute path='/pr/board' component={Board} />
                        </Switch>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}
class App extends Component {
    componentWillMount() {
        if (this.props.initURL === '') {
            this.props.setInitUrl(this.props.history.location.pathname);
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(" ___ NEXT PROPS ___ ", nextProps);
        if (nextProps.token) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
        }
        if (nextProps.token && !nextProps.authUser) {
            this.props.getUser();
        }
    }
    render() {
        const { match, location, token, authUser, initURL } = this.props;
        console.log(" props : ", this.props);
        return (
            <React.Fragment>
                <Switch>
                    <Redirect exact path="/" to="/pr" />
                    <Route path='/pr' token={token} component={ProtectedPages} />
                    <Route path='/login' component={Login} />
                </Switch>
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { authUser, token, initURL } = auth;
    return { authUser, token, initURL }
};
const mapDispatchToProps = {setInitUrl, getUser}
export default connect(mapStateToProps, mapDispatchToProps)(App);
