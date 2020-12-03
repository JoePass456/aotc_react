import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { axiosHelper } from '../utilities/axiosHelper';
import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import '../App.css';
// import AppContext from '../utilities/AppContext';

function Landing() {
    // const context = useContext(AppContext);
    // const [msg, setMsg] = useState("You are not logged in");
    const [ loggedIn, setLoggedIn] = useState(false);
    // let loggedIn = false;
    // let res = {};
    const [ name, setName ] = useState("Loading");



    let token = (localStorage.getItem("token"));
    // token? setLoggedIn(true) : setLoggedIn(false);
    // let name = localStorage.getItem("name");

    const getUser = (res) => {
        // console.log(res);
        localStorage.setItem("name", res.name);
        localStorage.setItem("id", res.id);
        localStorage.setItem("email", res.email);

        // setMsg(`Welcome ${res.name}!`);
        setLoggedIn(true);
        // name = res.name;
        // loggedIn = true;
        setName(res.name)

    };

    if (token) {

        console.log('Axiox Call');

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + token
        };

        axiosHelper('get', '/api/user', {}, headers, getUser);

    }

    console.log('Render');



    return (
        <>
            <Header heading="QWITTER" />
            <Row>
                <Col className="text-center">

                    {loggedIn ?
                        <>
                            <h4>Welcome back {name}!</h4>
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
        </>
    )
}

export default Landing
