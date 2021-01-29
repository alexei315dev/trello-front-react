import React from 'react';
import { setInitUrl, getUser, userSignUp } from '../../actions';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            validated: false
        }
    }
    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
          this.setState({validated: true})
        } else {
            console.log(this.state.username, this.state.email, this.state.password)
            this.props.userSignUp({ username: this.state.username, email: this.state.email, password: this.state.password });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.authUser !== this.props.authUser) {
            const { authUser, initURL } = this.props;
            if(authUser) {
                this.props.history.push(initURL === '' || initURL === '/auth/register' || initURL === '/auth/register/' ? '/pr' : initURL)
            }
        }
    }
    render() {
        const { username, email, password, confirmPassword, validated } = this.state;
        return (
            <div className="bg-image">
                <div className="row no-gutters justify-content-center bg-black-75">
                    <div className="hero-static col-sm-8 col-md-6 col-xl-4 d-flex align-items-center p-2 px-sm-0">
                        <div className="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
                            <div className="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-white">
                                <div className="mb-2 text-center">
                                    <a className="link-fx text-success font-w700 font-size-h1" href="#">
                                        <span className="text-dark">Trello</span><span className="text-success">PowerUp</span>
                                    </a>
                                    <p className="text-uppercase font-w700 font-size-sm text-muted">Create New Account</p>
                                </div>
                                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                                    <Form.Group className="input-group">
                                        <Form.Control
                                            className="form-control"
                                            required
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => this.setState({ username: e.target.value })}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-user-circle"></i>
                                            </span>
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a Username.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="input-group">
                                        <Form.Control
                                            className="form-control"
                                            required
                                            type="text"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-envelope-open"></i>
                                            </span>
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Email.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="input-group">
                                        <Form.Control
                                            className="form-control"
                                            required
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => this.setState({ password: e.target.value })}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-asterisk"></i>
                                            </span>
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="input-group">
                                        <Form.Control
                                            className="form-control"
                                            required
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                        />
                                        <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="fa fa-asterisk"></i>
                                                </span>
                                            </div>
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type="submit" className="btn btn-success w-100">
                                        <i className="fa fa-fw fa-plus mr-1"></i> Sign Up
                                    </Button>
                                </Form>
                                <div className="text-center">
                                   <Link className="font-w600 font-size-sm" to="/auth/login">You have already logged in?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    const { authUser,  initURL } = auth;
    return { authUser,  initURL }
};
const mapDispatchToProps = { setInitUrl, getUser, userSignUp };
export default connect(mapStateToProps, mapDispatchToProps)(Register);