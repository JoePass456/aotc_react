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

    // const [msg, setMsg] = useState("You are not logged in");
    
    // let loggedIn = false;
    // let res = {};
    const [name, setName] = useState("Loading");



    // token? setLoggedIn(true) : setLoggedIn(false);
    // let name = localStorage.getItem("name");

    const getUser = (res) => {
        // console.log(res);
        localStorage.setItem("name", res.name);
        localStorage.setItem("id", res.id);
        localStorage.setItem("email", res.email);
        localStorage.setItem("bio", res.bio);


        // setMsg(`Welcome ${res.name}!`);
        // name = res.name;
        // loggedIn = true;
        setName(res.name)

    };
    useEffect(() => {
        // console.log(context.token);
        // let lsName = localStorage.getItem("name");

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token
        };

        if (context.token.length > 0) {

            axiosHelper('get', '/api/user', {}, headers, getUser);

            context.setLoggedIn(true);
        }

    }, [context.token])

    console.log('Render');



    return (
        <Container className="postsbg">
            <Header/>
            <Row>
                <Col className="text-center">

                    {context.loggedIn ?
                        <>
                            <h4>Welcome, {name}!</h4>
                            <Link to="/logout">That's not me</Link><br></br>
                            <Link to="/posts">Go to site</Link>
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
            <Spacer spaces="18" />
        </Container>
    )
}

export default Landing
