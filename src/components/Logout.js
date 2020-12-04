import React, { useEffect, useContext } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppContext from '../utilities/AppContext';
import Header from '../components/Header';
import Spacer from '../components/Spacer';

function Logout() {
    const context = useContext(AppContext);

    useEffect(()=> {
        localStorage.clear();
        context.setToken("");
        context.setLoggedIn(false);
    },[])

    return (
        <Container className="postsbg">
            <Header/>
            <Row>
                <Col className="text-center">
                    <h4>You are now logged out</h4>
                    <Link to="/login">Log in</Link><br></br>
                    <Link to="/register">Create new account</Link><br></br>
                    <Link to="/posts">Go to site without logging in</Link><br></br>
                    <p>(Create an account to post, like, and more!)</p>
                </Col>
            </Row>
            <Spacer spaces="15"/>
        </Container>
    )
}

export default Logout
