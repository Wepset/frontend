import React, {useCallback, useState} from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';

import Product from '../../components/Product/Product.jsx';
import OrderGrid from '../../components/OrderGrid/OrderGrid.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import SearchConsumer from '../../components/SearchConsumer/SearchConsumer.jsx';

function Sales() {
    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => setShow(false), []);
    const handleShow = useCallback(() => setShow(true), []);

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Dados para a Busca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Product />
                </Modal.Body>
            </Modal>

            <Container>
                <Form.Row className="d-flex flex-nowrap">
                    <SearchConsumer label="Cliente" />
                    <SearchConsumer label="Vendedor" />
                    <Form.Group className="d-flex align-items-end col-md-2">
                        <Button variant="primary" onClick={handleShow}>
                            Pesquisar item
                        </Button>
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center">
                        <span className="d-flex rounded float-right img-fluid">
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