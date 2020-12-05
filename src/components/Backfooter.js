import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../App.css';


function Backfooter(props) {
    return (
        <Row className="navbar fixed-bottom">
            <Col xs="4" className="headButtons">
                {/* <Link to="/profile" className="">Profile</Link> */}
            </Col>
            <Col xs="4" className="headButtons">
                <Link to={props.link}>Go back</Link>
            </Col>
            <Col xs="4" className="headButtons">
                {/* <Link to="/newpost" className="">New</Link> */}
            </Col>
        </Row>

    )
}

export default Backfooter