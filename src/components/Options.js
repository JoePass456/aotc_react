import React, { useContext } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../utilities/AppContext';
import Spacer from '../components/Spacer';
import Backfooter from '../components/Backfooter';

function Options() {
    const context = useContext(AppContext);
    return (
        <Container className="postsbg">
            {!context.token ? <Redirect to="/" /> : null}
            <Row>
                <Col className="text-center col-12">
                    <h4 className="name">Options</h4>
                </Col>
            </Row>
            <Row>
                <Col className="text-center col-12">
                    <h4>You are logged in as</h4>
                    <h4>{context.name}</h4>
                    
                    <Link to="/logout">Logout</Link>
                    
                </Col>
            </Row>
            <Row>
                <Col className="text-center col-12">
                    <h4 className="name">Search options</h4>
                </Col>
            </Row>
            <Row>
                <Col className="text-center col-12">
                    <p>***COMING SOON***</p>
                    <p>Find quotes by USER</p>
                    <p>Find quotes by TAG</p>
                    <p>Find quotes by AUTHOR</p>
                    <p>Find quotes by SEARCH</p>
                    <p>Find users</p>
                    
                </Col>
            </Row>

            <Spacer spaces="12"/>
            <Backfooter link="/posts"/>
        </Container>
    )
}

export default Options
