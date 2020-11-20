import React from 'react';
import { Row, Col } from 'reactstrap';

function Header(props) {


    return (
        <div id="blog" className="container-fluid gill marble edge">
            <Row className="row">
                <Col className="col text-center p-3">
                    <h1>{props.heading}</h1>
                    <h4>{props.subHeading}</h4>
                </Col>
            </Row>
            <Row className="row text-center">
                <Col className="col">
                    <a href="#projects">NEWEST</a>
                </Col>
                <Col className="col">
                    <a href="#links">HOTTEST</a>
                </Col>
                <Col className="col">
                    <a href="#about">FOLLOWING</a>
                </Col>
            </Row>
        </div>
    )
};

export default Header;