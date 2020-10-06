import React, { useCallback, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';

import Icon from '../../components/Icon/Icon.jsx';
import Person from '../../components/Person/Person.jsx';
import { useProducts } from '../../hooks/products';

function SearchCustomer({ searchItemButton, ...rest }) {
  const { setCustomer, setSeller, customer, searchPerson } = useProducts();
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);
  const handleChange = useCallback((e) => {
    setCustomerName(e.target.value);
  }, []);

  const handleBlur = useCallback(async (e) => {
    if (!e.target.value) {
      return;
    }

    const response = await searchPerson(e);

    if (response.data.length === 1) {
      setCustomer(response.data[0]);

      if (response.data[0].interno.status) {
        setSeller({ ...response.data[0].interno });
        searchItemButton.current.focus();
        searchItemButton.current.click();
      }
    } else if (response.data.length === 0) {
      setCustomer({});
      setShow(false);
    } else {
      setShow(true);
    }
  }, [searchItemButton, searchPerson, setCustomer, setSeller]);

  const informeParent = (selectedPerson) => {
    setCustomer(selectedPerson);
    handleClose();
  };

  useEffect(() => {
    setCustomerName(customer.razao_social_nome || '');
    setCustomerId(customer.id || '')

    return () => { };
  }, [customer, searchItemButton, setCustomerName]);

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

      <Form.Group as={Form.Col} className="justify-content-end flex-column">
        <Form.Label className="mr-2">Cliente</Form.Label>
        <Form.Control type="text" placeholder={`Informe o cliente`} {...rest} onBlur={handleBlur} onChange={handleChange} autoFocus={true} />
      </Form.Group>

      <Form.Group as={Form.Col} className="align-items-end mr-1 ml-1">
        <Form.Control type="text" data-id={customerId} data-target="customer" value={customerName} disabled />
      </Form.Group>

      <Form.Group className="align-items-end mr-1">
        <span onClick={handleShow}>
          <h3><Icon label="icon L5C5" alt="L5C5" /></h3>
        </span>
        <h3><Icon label="icon L1C5" alt="L1C5" /></h3>
      </Form.Group>
    </>
  );
}

export default SearchCustomer;