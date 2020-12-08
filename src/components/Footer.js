import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../App.css';


function Footer() {
    return (
        <Row className="navbar fixed-bottom">
            <Col xs="4" className="headButtons">
                <Link to="/profile" className="">Profile</Link>
            </Col>
            <Col xs="4" className="headButtons">
                <Link to="/options" className="">Options</Link>
            </Col>
            <Col xs="4" className="headButtons">
                <Link to="/newpost" className="">New</Link>
            </Col>
        </Row>

    )
}

export default Footer
