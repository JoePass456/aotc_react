import React, { useState, useContext } from 'react';
import AppContext from '../utilities/AppContext';
import { Button, Container, Row, Col } from 'reactstrap';
import { axiosHelper } from '../utilities/axiosHelper';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Backfooter from '../components/Backfooter';


function Editbio() {
    const [posted, setPosted] = useState(false);
    const context = useContext(AppContext);

    // const [bio, setBio] = useState('');

    const onBioChange = (e) => {
        context.setBio(e.target.value);
    };    

    const callPost = () => {
                                                                                                                                                                                                                                                                                                                 
        // context.setBio(bio);

        let postBody = {
            bio: context.bio,            
            id: context.id,            
        };

        // console.log(postBody);

        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + context.token
        };

        axiosHelper('post', '/user/editbio', postBody, headers, getRes);

        setPosted(true);

    };

    const getRes = (res) => {

        if (res !== {}) {

            // console.log(res);

        } else {

            // console.log('Error, no data returned!');

        }
    }

    return (
        <Container className="postsbg">
            {!context.token ? <Redirect to="/" /> : null}
            <Header />
            <Row >
                <Col className="text-center">
                    <div>Input New Bio: </div>
                    <textarea rows="5" cols="30" type="text" value={context.bio} onChange={onBioChange} />
                </Col>
            </Row>
            
            {posted ?
                <Row>
                    <Col className="text-center">
                        <Link to="/profile">Successfully posted!<br></br>Click to continue</Link>
                    </Col>
                </Row>
                :
                <Row>
                    <Col className="text-center">
                        <Button className="m-2" onClick={callPost}>Submit</Button><br></br>
                        {/* <Link to="/posts">Or click to go back</Link> */}
                    </Col>
                </Row>
            }
            <Backfooter link="/profile"/>
            <Spacer spaces="16" />
        </Container>
    )
}

export default Editbio
