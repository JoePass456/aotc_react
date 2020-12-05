import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import '../App.css';

function Header() {

    return (
        <>
            <Container className="">
                <Row >
                    <Col xs="12" className="text-center pt-1">
                        <h1>"QUOTER"</h1>
                        <h4></h4>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default Header;