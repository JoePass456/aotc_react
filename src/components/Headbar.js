import React from 'react'
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import '../App.css';


function Headbar() {
    return (
        
        <Row className="navbar fixed-top">

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

export default Headbar

