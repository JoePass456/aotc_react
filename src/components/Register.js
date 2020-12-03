import Header from '../components/Header';
import React, { useState } from 'react'
// import AppContext from '../utilities/AppContext';
import { Button, Row, Col, Container } from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper';
import { Redirect, Link } from 'react-router-dom';


function Register() {

    // const [regRes, setRegRes] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const onNameChange = (e) => {
        setName(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const loginInfo = {
        name: name,
        email: email,
        password: password
    }

    const signUp = (res) => {

        // setRegRes(res);

        if (res !== {}) {

            // console.log(res);

            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);

        } else {
            console.log('Error, no data returned!');
        }
    }



    return (
        <>
            <Header heading="QWITTER" />
            { token ? <Redirect to="/" /> : null}

            { localStorage.getItem("token") ?
                <Container>

                    <Row >
                        <Col className="text-center">
                            <h5>You may already be logged in</h5>
                            <Link to="/logout">Log out</Link><br></br>
                            <Link to="/">See who is logged in</Link><br></br>
                        </Col>
                    </Row>
                </Container>
                :
                <Container>
                    <Row >
                        <Col className="text-center">
                            <div>Input Name: </div>
                            <input type="email" value={name} onChange={onNameChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <div>Input Password: </div>
                            <input type="password" value={password} onChange={onPasswordChange} /><br></br>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="text-center">
                            <div>Input Email: </div>
                            <input type="email" value={email} onChange={onEmailChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button className="m-2" onClick={() => axiosHelper('post', '/register', loginInfo, {}, signUp)}>SignUp</Button>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}

export default Register
