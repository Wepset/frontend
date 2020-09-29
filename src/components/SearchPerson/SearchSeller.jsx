import React, { useCallback, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';

import Icon from '../../components/Icon/Icon.jsx';
import Person from '../../components/Person/Person.jsx';
import { useProducts } from '../../hooks/products';

function SearchSeller({ ...rest }) {
  const { setSeller, seller, searchPerson } = useProducts();
  const [sellerName, setSellerName] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);
  const handleChange = useCallback((e) => {
    setSellerName(e.target.value);
  }, []);

  const handleBlur = useCallback(async (e) => {
    if (!e.target.value) {
      return;
    }

    const response = await searchPerson(e);

    if (response.data.length === 1) {
      setSeller(response.data[0]);
    } else if (response.data.length === 0) {
      setSeller({});
      setShow(false);
    } else {
      setShow(true);
    }
  }, [searchPerson, setSeller]);

  const informeParent = (selectedPerson) => {
    setSeller(selectedPerson);
    handleClose();
  };

  useEffect(() => {
    setSellerName(seller.razao_social_nome || '')
  }, [seller, setSellerName]);

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
        <Form.Label className="mr-2">Vendedor</Form.Label>
        <Form.Control type="text" data-target="seller" placeholder={`Informe o vendedor`} {...rest} onBlur={handleBlur} onChange={handleChange} value={sellerName} />
      </Form.Group>

      <Form.Group className="d-flex align-items-end mr-1">
        <span onClick={handleShow}>
          <h3><Icon label="icon L5C5" alt="L5C5" /></h3>
        </span>
        <h3><Icon label="icon L1C5" alt="L1C5" title="Orçamento" /></h3>
        <h3><Icon label="icon L1C5" alt="L1C5" title="Pedido" /></h3>
        <h3><Icon label="icon L1C5" alt="L1C5" title="Composição" /></h3>
      </Form.Group>
    </>
  );
}

export default SearchSeller;