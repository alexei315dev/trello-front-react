import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReduxToastr from 'react-redux-toastr';

import configureStore, { history } from "./store";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import App from "./App";
export const store = configureStore();

const MainApp = () =>
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/" render={(props) => (<App {...props} />)} />
            </Switch>
        </Router>
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick />
    </Provider>

export default MainApp;