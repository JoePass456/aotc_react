import React from 'react';
import { Row, Col } from 'reactstrap';
import '../App.css';

function Header(props) {


    return (
        <>
            <div className="container-fluid ">
                <Row >
                    <Col className="text-center p-3">
                        <h1>{props.heading}</h1>
                        <h4>{props.subHeading}</h4>
                    </Col>
                </Row>
            </div>
        </>
    )
};

export default Header;