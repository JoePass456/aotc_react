import React, { useState, useContext } from 'react';
import AppContext from '../utilities/AppContext';
import { Button, Container, Row, Col } from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Backfooter from '../components/Backfooter';


function Editpost() {
    const [posted, setPosted] = useState('');
    const context = useContext(AppContext);

    const [post, setPost] = useState(context.targetPost.post);
    const [author, setAuthor] = useState(context.targetPost.author);
    const [tag, setTag] = useState(context.targetPost.tag);


    context.setEditSwitch(0);

    const onPostChange = (e) => {
        setPost(e.target.value);
    }
    const onAuthorChange = (e) => {
        setAuthor(e.target.value);
    }
    const onTagChange = (e) => {
        setTag(e.target.value);
    }

    const callEditPost = () => {

        let postBody = {
            post: post,
            author: author,
            id: context.targetPost.id,
            tag: tag
        };
        console.log(postBody);
        // console.log(postBody);

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token
        };

        axiosHelper('post', '/editpost', postBody, headers, getRes);

        setPosted("Post successfully updated!");

    }
    const callDelPost = () => {

        let postBody = {            
            id: context.targetPost.id            
        };
        console.log("DELETE");
        // console.log(postBody);

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token
        };

        axiosHelper('post', '/delpost', postBody, headers, getRes);

        setPosted("Post was successfully deleted!");

    }

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
                    <textarea rows="1" cols="30" type="text" value={author} onChange={onAuthorChange} /><br></br>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <div>Tag (optional): </div>
                    <textarea rows="1" cols="30" type="text" value={tag} onChange={onTagChange} /><br></br>
                </Col>
            </Row>
            {posted ?
                <Row>
                    <Col className="text-center">
                        <Link to="/profile"><h4>{posted}</h4><br></br>Click to continue</Link>
                    </Col>
                </Row>
                :
                <>
                    <Row>
                        <Col className="text-center">
                            <Button className="m-2" onClick={callEditPost}>Submit Edit</Button><br></br>
                            {/* <Link to="/posts">Or click to go back</Link> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button className="m-2" onClick={callDelPost}>Delete Post Forever</Button><br></br>
                            {/* <Link to="/posts">Or click to go back</Link> */}
                        </Col>
                    </Row>
                </>
            }
            <Backfooter link="/profile" />
            <Spacer spaces="16" />
        </Container>
    )
}

export default Editpost
