import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { userSignOut } from '../actions/Auth';
import { connect } from 'react-redux';

const Navbar = (props) => {
    const logout = () => {
        props.userSignOut();
    }
    return (
        <header id="page-header">
            <div className="content-header justify-content-center justify-content-lg-between">
                <div className="d-flex align-items-center">
                    <Link className="font-size-lg font-w600 text-dark" to="/pr/dashboard">
                        Trello<span className="text-primary">PowerUp</span>
                    </Link>
                </div>
                <div className="d-none d-lg-flex align-items-center">
                    <Button onClick={logout}>Logout</Button>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = ({ auth }) => {
    const { authUser,  initURL } = auth;
    return { authUser,  initURL }
};
const mapDispatchToProps = { userSignOut };
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);