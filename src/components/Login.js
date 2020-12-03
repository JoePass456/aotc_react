import Header from '../components/Header';
import React, { useContext, useState } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../utilities/AppContext';
// import Landing from '../components/Landing';

function Login() {
    const context = useContext(AppContext);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const callLogIn = () => {

        let logInInfo = {
            grant_type: "password",
            client_id: 2,
            client_secret: context.secret,
            password: password,
            username: email,
            scope: ""
        }

        axiosHelper('post', '/v1/oauth/token', logInInfo, {}, getLogIn);

    }


    const getLogIn = (res) => {

        if (res !== {}) {

            localStorage.setItem("token", res.access_token);
            setToken(res.access_token);
            
        } else {

            console.log('Error, no data returned!');

        }
    }

    return (
        <Container>
            {token? <Redirect to="/"/> : null}
            <Header heading="TWIT" />
            <Row >
                <Col className="text-center">
                    <div>Input Email: </div>
                    <input type="email" value={email} onChange={onEmailChange} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <div>Input Password: </div>
                    <input type="password" value={password} onChange={onPasswordChange} /><br></br>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button className="m-2" onClick={callLogIn}>Login</Button>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Link to="/register">Create new account</Link><br></br>
                    <Link to="/posts">Go to site without logging in</Link><br></br>
                    <p>(Create an account to post, like, and more!)</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
