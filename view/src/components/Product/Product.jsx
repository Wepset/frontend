import React, { useCallback, useRef, useState } from 'react';

import ProductService from '../../http/Product.js';
import Order from '../../http/Order.js';

const Product = () => {
    const tableRef = useRef(null);
    const [formData, setFormData] = useState({
        fabricante: '',
        tipo: '',
        sub_descricao: '',
        obs: ''
    });
    const [rowSelected, setRowSelected] = useState(0);
    const [products, setProducts] = useState([]);

    const handleChange = useCallback((e) => {
        setFormData({ [e.target.name]: e.target.value });
    }, []);

    const getProducts = useCallback(async (e) => {
        e.preventDefault();

        let elements = Object.entries(formData).map(function (arr) {
            return (arr[1].length > 0) ? `${arr[0]}=${arr[1].toUpperCase()}` : '';
        });

        const urlParams = elements.filter(n => n).join('&');
        const response = await (new ProductService()).get(urlParams);
        const productsData = response.data;

        setProducts(productsData);

        if (Object.keys(productsData).length) {
            const productId = productsData[0].id;
            const tableRow = tableRef.current.querySelector(`tbody tr[data-id="${productId}"]`);

            tableRow.focus();
        }
    }, [formData]);

    const addProductToCart = useCallback((id) => {
        const message = `Adicionar produto #${id} ao carrinho?`;

        if (window.confirm(message)) {
            const request = (new Order()).create(id);

            request.then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });
        }
    }, []);

    const moveCursor = useCallback((e) => {
        const ENTER = 13;
        const UP = 38;
        const DOWN = 40;

        const productId = products[rowSelected].id;
        const tableRow = tableRef.current.querySelector(`tbody tr[data-id="${productId}"]`);

        tableRow.focus();

        switch (e.keyCode) {
            case ENTER:
                addProductToCart(productId);
                break;
            case UP:
                if (rowSelected > 0) {
                    setRowSelected(rowSelected - 1);
                }

                break;
            case DOWN:
                if ((rowSelected + 1) < products.length) {
                    setRowSelected(rowSelected + 1);
                }

                break;
            default:
                break;
        }
    }, [addProductToCart, products, rowSelected]);

    return (
        <div className="page-modal">
            <div>
                <form onSubmit={getProducts}>
                    <div className="form-row pl-1 pt-1">
                        <div className="col">
                            <input type="text" onChange={handleChange} className="form-control" placeholder="Fabricante" name="fabricante" />
                        </div>
                        <div className="col">
                            <input type="text" onChange={handleChange} className="form-control" placeholder="Tipo" name="tipo" />
                        </div>
                        <div className="col">
                            <input type="text" onChange={handleChange} className="form-control" placeholder="Sub Descrição" name="sub_descricao" />
                        </div>
                        <div className="col">
                            <input type="text" onChange={handleChange} className="form-control" placeholder="Observação" name="obs" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Composição" name="composicao" />
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary mb-2">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="overflow-auto" style={{ "maxHeight": "275px" }}>
                <table ref={tableRef} className="table table-hover" onKeyDown={moveCursor} tabIndex="0">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fabricante</th>
                            <th scope="col">Med</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Sub</th>
                            <th scope="col">Obs</th>
                            <th scope="col">Marca </th>
                            <th scope="col">UN</th>
                            <th scope="col">QTD</th>
                            <th scope="col">RES</th>
                            <th scope="col">PROM</th>
                            <th scope="col">Venda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(function (product, index) {
                                return (
                                    <tr key={product.id} data-id={product.id} tabIndex={index} className={index === rowSelected ? 'table-success' : 'table-light'}>
                                        <td>{product.id}</td>
                                        <td>{product.fabricante}</td>
                                        <td>{product.medida}</td>
                                        <td>{product.tipo}</td>
                                        <td>{product.sub_descricao}</td>
                                        <td>{product.obs}</td>
                                        <td>{product.marca}</td>
                                        <td>{product.un}</td>
                                        <td>{Math.floor(Math.random() * 1000)}</td>
                                        <td>{Math.floor(Math.random() * 1000)}</td>
                                        <td>{product.preco_promocao}</td>
                                        <td>{product.preco_venda}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product;