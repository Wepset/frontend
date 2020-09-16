import React, { useState, useEffect } from 'react';

import { AiFillGold, AiOutlineDiff } from 'react-icons/ai';

import Order from '../../http/Order.js';

function OrderGrid() {
    const [formFields, setFormFields] = useState({
        products: [],
        registers: {
            quantity: 0,
            value: 0.0
        },
        selected: {
            quantity: 0,
            value: 0.0
        },
    });

    /**
     * handleProducts
     * 
     * @param {Void}
     */
    function handleProducts() {
        ((new Order()).index()).then(response => {
            let products_form = response.data;

            products_form.map(function (arr) {
                let element = arr;

                element.selected = false;
                element.total_venda = 0.0;
                element.quantity = 0;

                return element;
            });

            setFormFields({
                products: products_form,
                registers: {
                    quantity: products_form.length,
                    value: 0.0
                },
                selected: {
                    quantity: 0,
                    value: 0.0
                }
            })
        });
    }

    useEffect(function () {
        handleProducts();
    }, []);

    /**
     * Set the totals into the form.
     * 
     * @param {Void}
     */
    function handleUpdates() {
        const selects = formFields.products.reduce((sum, products) => (products.selected === true) ? parseInt(sum + 1) : parseInt(sum), 0);
        const total_selects = formFields.products.reduce((sum, products) => (products.selected === true) ? parseFloat(sum + products.total_venda) : parseFloat(sum), 0);
        const total_registers = formFields.products.reduce((sum, products) => parseFloat(sum + products.total_venda), 0);

        setFormFields({
            products: formFields.products,
            registers: {
                quantity: formFields.products.length,
                value: total_registers
            },
            selected: {
                quantity: selects,
                value: total_selects
            }
        });
    }

    function handleSetterCheckbox(id, value) {
        const new_products = formFields.products.map(function (arr) {
            if (arr.id === id) {
                arr.selected = value;
            }

            return arr;
        });

        setFormFields({
            products: new_products,
            registers: formFields.registers,
            selected: formFields.selected
        });

        handleUpdates();
    }

    function updateTotalSale(id, quantity) {
        const price = formFields.products.reduce((sum, products) => (products.id === id) ? parseFloat(sum + products.preco_venda) : parseFloat(sum), 0);

        const new_products = formFields.products.map(function (arr) {
            let obj = arr;

            if (arr.id === id) {
                obj.total_venda = quantity * price;

                return obj;
            } else {
                return arr;
            }
        });

        setFormFields({
            products: new_products,
            registers: formFields.registers,
            selected: formFields.selected
        });

        handleUpdates();
    }

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">DATA</th>
                        <th scope="col">FABRICANTE</th>
                        <th scope="col">MED</th>
                        <th scope="col">TIPO</th>
                        <th scope="col">SUB DESC</th>
                        <th scope="col">OBS</th>
                        <th scope="col">MARCA</th>
                        <th scope="col">MV</th>
                        <th scope="col">UN</th>
                        <th scope="col">EST</th>
                        <th scope="col">RES</th>
                        <th scope="col">QTD</th>
                        <th scope="col">VENDA</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">Q.U.VDA</th>
                        <th scope="col">D.U.VDA</th>
                        <th scope="col">V.U.VDA</th>
                        <th scope="col">ICONES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (formFields.products).map(function (value, index, array) {
                            return (
                                <tr key={value.id}>
                                    <td>
                                        <input type="checkbox" onClick={(e) => { handleSetterCheckbox(value.id, e.target.checked) }} value={value.selected} aria-label="Checkbox for following text input" />
                                    </td>
                                    <td>{value.id}</td>
                                    <td>{new Date(value.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                    <td>{value.fabricante}</td>
                                    <td>{value.medida}</td>
                                    <td>{value.tipo}</td>
                                    <td>{(value.sub_descricao).substr(0, 5)}</td>
                                    <td>{(value.obs).substr(0, 5)}</td>
                                    <td>{(value.marca).substr(0, 5)}</td>
                                    <td>{value.un}</td>
                                    <td>{value.un}</td>
                                    <td>{value.un}</td>
                                    <td>{value.un}</td>
                                    <td>
                                        <input type="text" onChange={(e) => { updateTotalSale(value.id, e.target.value) }} style={{ "width": "75px" }} aria-label="Quantity" className="col-sm" value={value.qtd} />
                                    </td>
                                    <td>{value.preco_venda}</td>
                                    <td>{(value.total_venda).toFixed(2)}</td>
                                    <td>{value.preco_promocao}</td>
                                    <td>{value.preco_promocao}</td>
                                    <td>{value.preco_venda}</td>
                                    <td>
                                        <i><AiFillGold /></i>
                                        <i><AiOutlineDiff /></i>
                                        <i><AiFillGold /></i>
                                        <i><AiFillGold /></i>
                                        <i><AiFillGold /></i>
                                        <i><AiFillGold /></i>
                                        <i><AiFillGold /></i>
                                        <i><AiFillGold /></i>
                                        <i><AiFillGold /></i>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td className="text-right" colSpan="12">REGISTROS</td>

                        <td>{formFields.registers.quantity}</td>
                        <td>{formFields.registers.value}</td>

                        <td colSpan="5">
                            <button type="button" className="btn btn-primary">Converter em pedido</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-right" colSpan="12">SELECIONADOS</td>

                        <td>{formFields.selected.quantity}</td>
                        <td>{formFields.selected.value}</td>

                        <td colSpan="5">
                            <button type="button" className="btn btn-primary">Gerar PDF</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default OrderGrid;