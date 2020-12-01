import React from 'react';
import { Row, Col } from 'reactstrap';
import '../App.css';


function Footer() {
    return (
        <Row className="navbar fixed-bottom">

                    <Col xs="4"className="headButtons">
                        <p className="">Newist</p>
                    </Col>
                    <Col xs="4"className="headButtons">
                        <p className="">Hottest</p>
                    </Col>
                    <Col xs="4"className="headButtons">
                        <p className="">Search</p>
                    </Col>
                
        </Row>
        
    )
}

export default Footer
