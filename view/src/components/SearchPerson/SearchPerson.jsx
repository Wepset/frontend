import React, { useCallback, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { FiZoomIn } from 'react-icons/fi';
import { AiOutlineSolution } from 'react-icons/ai';

import Person from '../../components/Person/Person.jsx';

function SearchPeople(props) {
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
                    <Person />
                </Modal.Body>
            </Modal>

            <Form.Group as={Form.Col}>
                <Form.Label className="mr-2">{props.label}</Form.Label>
                <Form.Control type="text" placeholder={`Informe o ${props.label}`} />
            </Form.Group>

            <Form.Group className="d-flex align-items-end col-md-1">
                <span onClick={handleShow}>
                    <h3> <FiZoomIn /></h3>
                </span>
                <h3> <AiOutlineSolution /></h3>
            </Form.Group>
        </>
    );
}

export default SearchPeople;