import React from 'react';

import * as ReactDOM from 'react-dom';

import { Form, Button, Container, Image } from 'react-bootstrap';
import { FiZoomIn } from 'react-icons/fi';
import { AiOutlineSolution } from 'react-icons/ai';

import Logo from './../../images/alfa-sistemas.png';

import Consumer from '../../components/Consumer/Consumer.jsx';
import Product from '../../components/Product/Product.jsx';

import './Sales.css';

function Sales() {
    return (
        <Container>
            <Form.Row className="d-flex flex-nowrap">
                <>
                    <Form.Group as={Form.Col}>
                        <Form.Label className="mr-2">Cliente</Form.Label>
                        <Form.Control type="text" placeholder="Informe o Cliente" />
                    </Form.Group>

                    <Form.Group className="d-flex align-items-end col-md-1">
                        <span onClick={() => { ReactDOM.render(<Consumer />, document.querySelector("#modal")) }}>
                            <h3> <FiZoomIn /></h3>
                        </span>
                        <h3> <AiOutlineSolution /></h3>
                    </Form.Group>
                </>

                <>
                    <Form.Group as={Form.Col}>
                        <Form.Label>Vendedor</Form.Label>
                        <Form.Control type="text" placeholder="Informe o Vendedor" />
                    </Form.Group>

                    <Form.Group className="d-flex align-items-end col-md-1">
                        <span onClick={() => { ReactDOM.render(<Consumer />, document.querySelector("#modal")) }}>
                            <h3> <FiZoomIn /></h3>
                        </span>
                        <h3> <AiOutlineSolution /></h3>
                    </Form.Group>
                </>

                <Form.Group className="d-flex align-items-end col-md-2">
                    <Button variant="primary" onClick={() => { ReactDOM.render(<Product />, document.querySelector("#modal")) }}>
                        Pesquisar item
                    </Button>
                </Form.Group>

                <Form.Group className="d-flex align-items-center">
                    <Image src={Logo} alt="Logo" className="rounded float-right img-fluid" style={{ "height": "70px" }} />
                </Form.Group>
            </Form.Row>
        </Container >
    );
}

export default Sales;