import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'reactstrap';
import '../App.css';
import { axiosHelper } from '../utilities/axiosHelper';
import AppContext from '../utilities/AppContext';
import Header from '../components/Header';
import Spacer from '../components/Spacer';

function Landing() {
    const context = useContext(AppContext);   

    const getUser = (res) => {        
        
        context.setId(res.id);
        context.setEmail(res.email);
        context.setName(res.name);
        // console.log(res);
        // console.log(context.id);
        if (res.bio) {context.setBio(res.bio)};       
        
    };
    useEffect(() => {

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token
        };

        if (context.token.length > 0) {

            axiosHelper('get', '/api/user', {}, headers, getUser);
            context.setLoggedIn(true);
        }

    }, [context.token])
    
    return (
        <Container className="postsbg">
            <Header/>
            <Row>
                <Col className="text-center">

                    {context.loggedIn ?
                        <>
                            <h4>Welcome, {context.name}!</h4>
                            <Spacer spaces="0"/>
                            <Link to="/logout">That's not me</Link><br></br>
                            <Spacer spaces="0"/>
                            <Link to="/posts">That's me, Go to site!</Link>
                        </>
                        :
                        <>
                            <h4>You are not logged in</h4>
                            <Link to="/login">Log in now</Link><br></br>
                            <Link to="/register">Create new account</Link><br></br>
                            <Link to="/posts">Go to site without logging in</Link><br></br>
                            <p>(Create an account to post, like, and more!)</p>


                        </>}

                </Col>
            </Row>
            <Spacer spaces="21" />
        </Container>
    )
}

export default Landing
