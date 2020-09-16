import React from 'react';

import * as ReactDOM from 'react-dom';

import { Form, Button, Container } from 'react-bootstrap';

import Product from '../../components/Product/Product.jsx';
import OrderGrid from '../../components/OrderGrid/OrderGrid.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import SearchConsumer from '../../components/SearchConsumer/SearchConsumer.jsx';

function Sales() {
    return (
        <>
            <Container>
                <Form.Row className="d-flex flex-nowrap">
                    <SearchConsumer label="Cliente" />
                    <SearchConsumer label="Vendedor" />
                    <Form.Group className="d-flex align-items-end col-md-2">
                        <Button variant="primary" onClick={() => { ReactDOM.render(<Product />, document.querySelector("#modal")) }}>
                            Pesquisar item
                        </Button>
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center">
                        <span className="d-flex rounded float-right img-fluid" style={{ "height": "70px", "width": "70px" }}>
                            <Logo />
                        </span>
                    </Form.Group>
                </Form.Row>
            </Container >

            <OrderGrid />
        </>
    );
}

export default Sales;