import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';

import Product from '../../components/Product/Product.jsx';
import OrderGrid from '../../components/OrderGrid/OrderGrid.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import SearchCustomer from '../../components/SearchPerson/SearchCustomer.jsx';
import SearchSeller from '../../components/SearchPerson/SearchSeller.jsx';

function Sales() {
    const searchItemButton = useRef(null);
    const [title, setTitle] = useState('');
    const [show, setShow] = useState(false);
    const [focusOnFirstInput, setFocusOnFirstInput] = useState(false);

    const handleShow = useCallback(() => setShow(true), []);
    const handleClose = useCallback(() => {
        setShow(false);
        setFocusOnFirstInput(true);
    }, []);

    /**
     * Product search title.
     * 
     * @param {Void}
     * 
     * @return {Boolean}
     */
    function handleTitle() {
        const customer = document.querySelector(`input[data-target=customer]`);
        const seller = document.querySelector(`input[data-target=seller]`);

        setTitle(`Dados para a Busca #${customer.dataset.id} ${customer.value} / ${seller.value}`);

        return true;
    }

    useEffect(() => {
        handleTitle();
    });

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <Product />
                </Modal.Body>
            </Modal>

            <Container>
                <Form.Row className="flex-nowrap">
                    <SearchCustomer searchItemButton={searchItemButton} />
                    <SearchSeller />

                    <Form.Group className="justify-content-end flex-column">
                        <Form.Label className="mr-2">Pedido</Form.Label>
                        <Form.Control type="text" data-target="seller" placeholder={`Pedido`} />
                    </Form.Group>

                    <Form.Group className="align-items-end col-md-2 text-nowrap">
                        <Button ref={searchItemButton} variant="primary" onClick={handleShow}>
                            Pesquisar item
                        </Button>
                    </Form.Group>

                    <Form.Group className="align-items-center">
                        <span className="rounded float-right img-fluid">
                            <Logo />
                        </span>
                    </Form.Group>
                </Form.Row>
            </Container >

            <OrderGrid focusOnFirstInput={focusOnFirstInput} />
        </>
    );
}

export default Sales;