import React from 'react';
import Header from '../components/Header';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

function Logout() {

    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("token");


    return (
        <div>
            <Header heading="A1 Jokes" />
            <Row>
                <Col className="text-center">
                    <h4>You are now logged out</h4>
                    <Link to="/login">Log in</Link><br></br>
                    <Link to="/register">Create new account</Link><br></br>
                    <Link to="/posts">Go to site without logging in</Link><br></br>
                    <p>(Create an account to post, like, and more!)</p>
                </Col>
            </Row>
        </div>
    )
}

export default Logout
