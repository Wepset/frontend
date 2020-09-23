import React, { useCallback, useState, useEffect } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';

import Product from '../../components/Product/Product.jsx';
import OrderGrid from '../../components/OrderGrid/OrderGrid.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import SearchPerson from '../../components/SearchPerson/SearchPerson.jsx';

function Sales() {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

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
                    <SearchPerson autoFocus={true} label={"Cliente"} type={"customer"} />

                    <SearchPerson label={"Vendedor"} type={"seller"} />

                    <Form.Group as={Form.Col}>
                        <Form.Label className="mr-2">Date</Form.Label>
                        <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} />
                    </Form.Group>

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