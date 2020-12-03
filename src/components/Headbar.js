import React from 'react'
import { Row, Col, Container } from 'reactstrap';
import '../App.css';
import Header from './Header';
import { Link } from 'react-router-dom';


function Headbar(props) {
    return (
        <Container className="fixed-top text-center">
            <Row>
                <Col>
                    <Header heading="QWITTER" />
                </Col>
            </Row>
            <Row>
                <Col onClick={() => props.changePostsOrder('newist')} xs="4" className="headButtons">
                    <p className="">Newest</p>
                </Col>
                <Col onClick={() => props.changePostsOrder('oldest')} xs="4" className="headButtons">
                    <p className="">Oldest</p>
                </Col>
                <Col onClick={() => props.changePostsOrder('hottest')} xs="4" className="headButtons">
                    <p className="">Hottest</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Headbar

