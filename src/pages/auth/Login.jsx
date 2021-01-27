import React from 'react';
import TrelloClient from 'react-trello-client';
import { setInitUrl, getUser, userSignIn } from '../../actions';
import { connect } from 'react-redux';
import axios from '../../util/Api';
import { Container, Card, Form, Button } from 'react-bootstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    onLoginClickHandle = (e) => {
        e.preventDefault();
        this.props.userSignIn({email: this.state.email, password: this.state.password});
    }
    render() {
        const { email, password } = this.state;
        return (
            <Container className="vh-100 d-flex">
                <Card className="mx-auto my-auto login-box">
                    <h3 className="text-center">Login</h3>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => this.setState({email: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => this.setState({password: e.target.value})}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.onLoginClickHandle} className="w-100 mb-3">
                            Submit
                        </Button>
                    </Form>
                    {/* <TrelloClient
                        apiKey="116c7c5725648ba91d1cd56ae13b444d" // Get the API key from https://trello.com/app-key/
                        clientVersion={1} // number: {1}, {2}, {3}
                        apiEndpoint="https://api.trello.com" // string: "https://api.trello.com"
                        authEndpoint="https://trello.com" // string: "https://trello.com"
                        intentEndpoint="https://trello.com" // string: "https://trello.com"
                        authorizeName="React Trello Client Example" // string: "React Trello Client"
                        authorizeType="popup" // string: popup | redirect
                        authorizePersist={true}
                        authorizeInteractive={true}
                        authorizeScopeRead={false} // boolean: {true} | {false}
                        authorizeScopeWrite={true} // boolean: {true} | {false}
                        authorizeScopeAccount={true} // boolean: {true} | {false}
                        authorizeExpiration="never" // string: "1hour", "1day", "30days" | "never"
                        authorizeOnSuccess={() => console.log('Login success')} // function: {() => console.log('Login success!')}
                        authorizeOnError={() => console.log("Login error!")} // function: {() => console.log('Login error!')}
                        autoAuthorize={false} // boolean: {true} | {false}
                        authorizeButton={true} // boolean: {true} | {false}
                        buttonStyle="metamorph" // string: "metamorph" | "flat"
                        buttonColor="green" // string: "green" | "grayish-blue" | "light"
                        buttonText="Login with Trello" // string: "Login with Trello"
                    /> */}
                </Card>
            </Container>
        )
    }
}

const mapDispatchToProps = {setInitUrl, getUser, userSignIn};
export default connect(() => ({}), mapDispatchToProps)(Login);