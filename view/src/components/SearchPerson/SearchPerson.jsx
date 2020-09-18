import React, { useCallback, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { FiZoomIn } from 'react-icons/fi';
import { AiOutlineSolution } from 'react-icons/ai';

import Person from '../../components/Person/Person.jsx';

import { useProducts } from '../../hooks/products';
import { useEffect } from 'react';

function SearchPeople({label, type}) {
    const {setCustomer, setSeller} = useProducts();
    const [personField, setPersonField] = useState('');
    const [person, setPerson] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => setShow(false), []);
    const handleShow = useCallback(() => setShow(true), []);

    const handleChange = useCallback((e) => {
        setPersonField(e.target.value);
    }, []);

    const handleBlur = useCallback((e) => {
        // faz requisição na API por código se retornar uma pessoa OK
        // setPerson(person);
        // setPersonField(person.razao_social_nome);
        // senão abre o modal
        // setShow(true);
    }, []);

    const informeParent = (selectedPerson) => {
        setPerson(selectedPerson);
        setPersonField(selectedPerson.razao_social_nome);
        handleClose();
    };

    useEffect(() => {
        if (type.toLowerCase() === 'customer') {
            setCustomer(person);
        } else if (type.toLowerCase() === 'seller') {
            setSeller(person);
        }
    }, [person, type, setCustomer, setSeller]);

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Dados para a Busca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Person informeParent={informeParent} />
                </Modal.Body>
            </Modal>

            <Form.Group as={Form.Col}>
                <Form.Label className="mr-2">{label}</Form.Label>
                <Form.Control type="text" placeholder={`Informe o ${label}`} onBlur={handleBlur} onChange={handleChange} value={personField} />
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