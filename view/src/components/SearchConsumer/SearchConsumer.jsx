import React from 'react';

import * as ReactDOM from 'react-dom';

import { FiZoomIn } from 'react-icons/fi';
import { AiOutlineSolution } from 'react-icons/ai';

import Consumer from '../../components/Consumer/Consumer.jsx';

import { Form } from 'react-bootstrap';

function SearchConsumer(props) {
    return (
        <>
            <Form.Group as={Form.Col}>
                <Form.Label className="mr-2">{props.label}</Form.Label>
                <Form.Control type="text" placeholder={`Informe o ${props.label}`} />
            </Form.Group>

            <Form.Group className="d-flex align-items-end col-md-1">
                <span onClick={() => { ReactDOM.render(<Consumer />, document.querySelector("#modal")) }}>
                    <h3> <FiZoomIn /></h3>
                </span>
                <h3> <AiOutlineSolution /></h3>
            </Form.Group>
        </>
    );
}

export default SearchConsumer;