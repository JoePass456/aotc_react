import React, { useState, useContext } from 'react';
import AppContext from '../utilities/AppContext';
import { Button, Container, Row, Col } from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import Spacer from '../components/Spacer';


function Newpost() {
    const [posted, setPosted] = useState(false);
    const context = useContext(AppContext);

    // let name = localStorage.getItem("name");
    let id = parseInt(localStorage.getItem("id"));
    // let email = localStorage.getItem("email");
    let token = localStorage.getItem("token");

    const [post, setPost] = useState('');
    const [author, setAuthor] = useState('');

    const onPostChange = (e) => {
        setPost(e.target.value);
    };
    const onAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const callPost = () => {

        let postBody = {
            post: post,
            author: author,
            id: id,
            parent: null
        };

        // console.log(postBody);

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + token
        };

        axiosHelper('post', '/newpost', postBody, headers, getRes);

        setPosted(true);

    };

    const getRes = (res) => {

        if (res !== {}) {

            console.log(res);

        } else {

            console.log('Error, no data returned!');

        }
    }



    return (
        <Container className="postsbg">
            {!context.token ? <Redirect to="/" /> : null}
            <Header />
            <Row >
                <Col className="text-center">
                    <div>Input Quote: </div>
                    <textarea rows="5" cols="30" type="text" value={post} onChange={onPostChange} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <div>Author (optional): </div>
                    <textarea rows="1" cols="20" type="text" value={author} onChange={onAuthorChange} /><br></br>
                </Col>
            </Row>
            {posted ?
                <Row>
                    <Col className="text-center">
                        <Link to="/posts">Successfully posted!<br></br>Click to continue</Link>
                    </Col>
                </Row>
                :
                <Row>
                    <Col className="text-center">
                        <Button className="m-2" onClick={callPost}>Submit</Button><br></br>
                        <Link to="/posts">Or click to go back</Link>
                    </Col>
                </Row>
            }

            <Spacer spaces="16" />
        </Container>
    )
}

export default Newpost
