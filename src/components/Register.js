import React, { useState, useContext } from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { axiosHelper } from '../utilities/axiosHelper';
import AppContext from '../utilities/AppContext';
import Spacer from '../components/Spacer';
import Header from '../components/Header';


function Register() {
    const context = useContext(AppContext);
    // const [regRes, setRegRes] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

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
        
        // console.log(res);
        if (res.status) {

            localStorage.setItem("token", res.data.token);
            context.setToken(res.data.token);

        } else {
            // console.log('Error, no data returned!');
        }
    }



    return (
        <Container className="postsbg">
            <Header/>
            { context.token ? <Redirect to="/" /> : null}

            { localStorage.getItem("token") ?
                <>

                    <Row >
                        <Col className="text-center">
                            <h5>You may already be logged in</h5>
                            <Link to="/logout">Log out</Link><br></br>
                            <Link to="/">See who is logged in</Link><br></br>
                        </Col>
                    </Row>
                    <Spacer spaces="15"/>
                </>
                :
                <>
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
                            <br></br>
                            <Link to="/">Go back</Link>
                        </Col>
                    </Row>
                    <Spacer spaces="14"/>
                </>
            }
        </Container>
    )
}

export default Register
