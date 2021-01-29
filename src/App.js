import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";
import axios from './config/Api';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Board from './pages/Board';
import Navbar from './container/Navbar';
import {
    getUser,
    setInitUrl,
} from "./actions";
import Dashboard from './pages/Dashboard';

const RestrictedRoute = ({ component: Component, token, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                token ?
                    <Component {...props} />
                    : <Redirect
                        to={{
                            pathname: '/auth/login',
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
                <Navbar />
                <Switch>
                    <Redirect exact path='/pr' to="/pr/dashboard" />
                    <Route path='/pr/board/:id' component={Board} />
                    <Route path='/pr/dashboard' component={Dashboard} />
                </Switch>
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
    componentDidUpdate() {
        console.log(" props ===> ", this.props);
        if (this.props.token) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.props.token;
        }
        if (this.props.token && !this.props.authUser) {
            this.props.getUser();
        }
    }
    render() {
        const { location, token, initURL } = this.props;
        console.log(" props : ", this.props);
        if (location.pathname === "/") {
            if (token === null) return <Redirect to="/auth/login" />
            else if (initURL === '' || initURL === '/auth' || initURL === '/auth' || initURL === '/auth/') return <Redirect to="/pr" />
            else return <Redirect to={initURL} />
        }
        return (
            <React.Fragment>
                 <div id="page-container">
                    <main id="main-container">
                        <Switch>
                            <Redirect exact path="/" to="/pr" />
                            <RestrictedRoute path='/pr' token={token} component={ProtectedPages} />
                            <Route path='/auth/login' component={Login} />
                            <Route path='/auth/Register' component={Register} />
                        </Switch>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { authUser, token, initURL } = auth;
    return { authUser, token, initURL }
};
const mapDispatchToProps = { setInitUrl, getUser }
export default connect(mapStateToProps, mapDispatchToProps)(App);
