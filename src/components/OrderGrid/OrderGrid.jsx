import React, { useCallback, useState, useEffect } from 'react';

import { useProducts } from '../../hooks/products';
import Icon from '../Icon/Icon.jsx';
import Order from '../../http/Order.js';
import api from '../../service/api';

function OrderGrid() {
    const { products, setProducts } = useProducts();

    const [formFields, setFormFields] = useState({
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
    const handleProducts = useCallback(() => {
        const order = new Order();

        order.index().then(response => {
            const productsList = response.data;

            productsList.map(function (product) {
                product.obs = product.obs.substr(0, 10);
                product.marca = product.marca.substr(0, 5);
                product.sub_descricao = product.sub_descricao.substr(0, 5);
                product.total_venda.toFixed(2);

                return product;
            });

            setProducts(productsList);
        });
    }, [setProducts]);

    /**
     * Update totals on checkbox click.
     * 
     * @param {Integer} id 
     * @param {Float} value 
     */
    const handleSetterCheckbox = useCallback((id, value) => {
        const updatedProducts = products.map(function (currentProduct) {
            if (currentProduct.id === id) {
                currentProduct.selected = value;
            }

            return currentProduct;
        });

        setProducts(updatedProducts);
    }, [products, setProducts]);

    /**
     * Update totals on change quantity input.
     * 
     * @param {Integer} id 
     * @param {Integer} quantity 
     */
    const updateTotalSale = useCallback(() => {
        const updatedProducts = products.map(function (product) {
            let price = 0;

            product.preco_venda.forEach(function (currentPrice) {
                if (currentPrice.selected === true) {
                    price = currentPrice.value;
                }
            });

            product.total_venda = product.quantity * price;

            return product;
        });

        setProducts(updatedProducts);
    }, [products, setProducts]);

    const handleUpdateSelect = useCallback((e, product) => {
        const newProductValue = e.target.value;
        const produtsSwap = products.map(function (currentProduct) {
            if (currentProduct.id === product.id) {
                let element_id = 0;

                currentProduct.preco_venda.forEach(function (value, index) {
                    if (parseFloat(newProductValue) === parseFloat(value.value)) {
                        element_id = index;
                    }
                });

                currentProduct.preco_venda.forEach(function (value, index) {
                    if (index === element_id) {
                        value.selected = true;
                    } else {
                        value.selected = false;
                    }

                    return value;
                });
            }

            return currentProduct;
        });

        setProducts(produtsSwap);
    }, [products, setProducts]);

    const updateQuantity = useCallback((e, product) => {
        const productsSwap = products.map(function (currentProduct) {
            if (currentProduct.id === product.id) {
                currentProduct.quantity = e.target.value;
            }

            return currentProduct;
        });

        setProducts(productsSwap);
    }, [setProducts, products]);

    const deleteProduct = useCallback(async product => {
        const productsSwap = [...products];
        const productIndex = products.findIndex(p => p.id === product.id);
        productsSwap.splice(productIndex, 1);
        setProducts(productsSwap);
        await api.delete(`/orders/${product.id}`);
    }, [products, setProducts]);

    useEffect(() => {
        handleProducts();
    }, [handleProducts]);

    useEffect(() => {
        const selects = products.reduce((sum, products) => (products.selected === true) ? parseInt(sum + 1) : parseInt(sum), 0);
        const totals = products.length;

        const total_selects = products.reduce((sum, products) => (products.selected === true) ? parseFloat(sum + products.total_venda) : parseFloat(sum), 0);
        const total_registers = products.reduce((sum, products) => parseFloat(sum + products.total_venda), 0);

        setFormFields({
            registers: {
                quantity: totals,
                value: total_registers.toFixed(2)
            },
            selected: {
                quantity: selects,
                value: total_selects.toFixed(2)
            }
        });
    }, [products]);

    return (
        <div>
            <table className="table table-hover table-sm">
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
                        products.map(function (product) {
                            return (
                                <tr key={product.id}>
                                    <td className="d-flex align-items-center">
                                        <Icon label="icon L1C2" alt="Delete Icon" onClick={() => deleteProduct(product)} />
                                        <input type="checkbox" className="ml-1" onClick={(e) => { handleSetterCheckbox(product.id, e.target.checked); }} value={product.selected} />
                                    </td>
                                    <td>{product.id}</td>
                                    <td>{product.created_at}</td>
                                    <td>{product.fabricante}</td>
                                    <td>{product.medida}</td>
                                    <td>{product.tipo}</td>
                                    <td>{product.sub_descricao}</td>
                                    <td>{product.obs}</td>
                                    <td>{product.marca}</td>
                                    <td>0,00</td>
                                    <td>{product.un}</td>
                                    <td>100</td>
                                    <td>100</td>
                                    <td>
                                        <input type="text" onChange={(e) => {
                                            updateQuantity(e, product);
                                            updateTotalSale();
                                        }} style={{ "width": "75px" }} aria-label="Quantity" className="form-control form-control-sm" value={product.quantity} />
                                    </td>
                                    <td>
                                        <select className="form-control form-control-sm" onChange={(e) => { handleUpdateSelect(e, product); updateTotalSale(); }} style={{ "width": "120px" }}>
                                            {
                                                product.preco_venda.map(function (price, index) {
                                                    return <option key={index} value={parseFloat(price.value)}>{price.label}</option>;
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>{product.total_venda}</td>
                                    <td>{product.quantity}</td>
                                    <td>0.00</td>
                                    <td>{product.preco_venda.map(price => (price.selected) ? price.value : '')}</td>
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