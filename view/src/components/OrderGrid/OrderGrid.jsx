import React, { useState, useEffect } from 'react';

import Icon from '../Icon/Icon.jsx';

import Order from '../../http/Order.js';

import './OrderGrid.css';

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
                arr.selected = false;
                arr.total_venda = 0.0;
                arr.quantity = 0;

                const price = parseFloat(arr.preco_venda).toFixed(2);

                let prices = [
                    { value: (price * 1.00).toFixed(2), label: `${(price * 1.00).toFixed(2)} -> 0%`, selected: true },
                    { value: (price * 0.96).toFixed(2), label: `${(price * 0.96).toFixed(2)} -> 4%`, selected: false },
                    { value: (price * 0.92).toFixed(2), label: `${(price * 0.92).toFixed(2)} -> 8%`, selected: false },
                    { value: (0.0.toFixed(2)), label: `--OUTROS--`, selected: false }
                ];

                arr.preco_venda = prices;

                return arr;
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
        const totals = formFields.products.length;

        const total_selects = formFields.products.reduce((sum, products) => (products.selected === true) ? parseFloat(sum + products.total_venda) : parseFloat(sum), 0);
        const total_registers = formFields.products.reduce((sum, products) => parseFloat(sum + products.total_venda), 0);

        setFormFields({
            products: formFields.products,
            registers: {
                quantity: totals,
                value: total_registers.toFixed(2)
            },
            selected: {
                quantity: selects,
                value: total_selects.toFixed(2)
            }
        });
    }

    /**
     * Update totals on checkbox click.
     * 
     * @param {Integer} id 
     * @param {Float} value 
     */
    function handleSetterCheckbox(id, value) {
        const updatedProducts = formFields.products.map(function (arr) {
            if (arr.id === id) {
                arr.selected = value;
            }

            return arr;
        });

        setFormFields({
            products: updatedProducts,
            registers: formFields.registers,
            selected: formFields.selected
        });
    }

    function handleUpdateSelect(e, id) {
        let produtsSwap = formFields.products;
        let newValue = e.target.value;

        produtsSwap.map(function (arr, idx) {
            if (arr.id === id) {
                let element_id = 0;

                arr.preco_venda.forEach(function (value, index, array) {
                    if (parseFloat(newValue) === parseFloat(value.value)) {
                        element_id = index;
                    }
                });

                arr.preco_venda.forEach(function (value, index, array) {
                    if (index === element_id) {
                        value.selected = true;
                    } else {
                        value.selected = false;
                    }

                    return value;
                });
            }

            return arr;
        });

        setFormFields({
            products: produtsSwap,
            registers: formFields.registers,
            selected: formFields.selected
        });

        updateTotalSale();

        handleUpdates();
    }

    function updateQuantity(id, e) {
        let productsSwap = formFields.products;

        productsSwap.map(function (arr, index) {
            if (arr.id === id) {
                arr.quantity = e.target.value;
            }

            return arr;
        });

        setFormFields({
            products: productsSwap,
            registers: formFields.registers,
            selected: formFields.selected
        });
    }

    /**
     * Update totals on change quantity input.
     * 
     * @param {Integer} id 
     * @param {Integer} quantity 
     */
    function updateTotalSale() {
        const updatedProducts = formFields.products.map(function (arr) {
            let price = 0;

            arr.preco_venda.forEach(function (value, index, array) {
                if (value.selected === true) {
                    price = value.value;
                }
            });

            arr.total_venda = arr.quantity * price;

            return arr;
        });

        setFormFields({
            products: updatedProducts,
            registers: formFields.registers,
            selected: formFields.selected
        });
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
                                    <td className="d-flex align-items-center">
                                        <Icon label="icon L1C2" alt="Delete Icon" />
                                        <input type="checkbox" className="ml-1" onClick={(e) => { handleSetterCheckbox(value.id, e.target.checked); handleUpdates(); }} value={value.selected} />
                                    </td>
                                    <td>{value.id}</td>
                                    <td>{new Date(value.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                    <td>{value.fabricante}</td>
                                    <td>{value.medida}</td>
                                    <td>{value.tipo}</td>
                                    <td>{(value.sub_descricao).substr(0, 5)}</td>
                                    <td>{(value.obs).substr(0, 5)}</td>
                                    <td>{(value.marca).substr(0, 5)}</td>
                                    <td>0,00</td>
                                    <td>{value.un}</td>
                                    <td>100</td>
                                    <td>100</td>
                                    <td>
                                        <input type="text" onChange={(e) => { updateQuantity(value.id, e); updateTotalSale(); handleUpdates(); }} style={{ "width": "75px" }} aria-label="Quantity" className="col-sm" value={value.qtd} />
                                    </td>
                                    <td>
                                        <select className="form-control form-control" onChange={(e) => { handleUpdateSelect(e, value.id); }} style={{ "width": "120px" }}>
                                            {
                                                value.preco_venda.map(function (str, index) {
                                                    return <option key={index} value={parseFloat(str.value)}>{str.label}</option>;
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>{(value.total_venda).toFixed(2)}</td>
                                    <td>{value.quantity}</td>
                                    <td>0.00</td>
                                    <td>
                                        {
                                            value.preco_venda.map(function (str, index) {
                                                if (str.selected) {
                                                    return str.value;
                                                }

                                                return ''
                                            })
                                        }
                                    </td>
                                    <td>
                                        <Icon label="icon L11C3" alt="L11C3" />
                                        <Icon label="icon L6C4" alt="L6C4" />
                                        <Icon label="icon L7C5" alt="L7C5" />
                                        <Icon label="icon L8C6" alt="L8C6" />
                                        <Icon label="icon L6C2" alt="L6C2" />
                                        <Icon label="icon L1C5" alt="L1C5" />
                                        <Icon label="icon L6C4" alt="L6C4" />
                                        <Icon label="icon L6C4" alt="L6C4" />
                                        <Icon label="icon L7C1" alt="L7C1" />
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

                        <td colSpan="6">
                            <button type="button" className="btn btn-primary">Converter em pedido</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-right" colSpan="12">SELECIONADOS</td>

                        <td>{formFields.selected.quantity}</td>
                        <td>{formFields.selected.value}</td>

                        <td colSpan="6">
                            <button type="button" className="btn btn-primary">Gerar PDF</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div >
    );
}

export default OrderGrid;