import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useProducts } from '../../hooks/products';
import ProductService from '../../http/Product.js';
import Order from '../../http/Order.js';

const Product = () => {
    const tableRef = useRef(null);
    const manufacturerInput = useRef(null);
    const [formData, setFormData] = useState({
        fabricante: '',
        tipo: '',
        sub_descricao: '',
        obs: ''
    });
    const [rowSelected, setRowSelected] = useState(0);
    const [productList, setProductList] = useState([]);
    const { products, setProducts } = useProducts();

    const handleChange = useCallback((e) => {
        setFormData({ [e.target.name]: e.target.value });
    }, []);

    const getProductList = useCallback(async (e) => {
        e.preventDefault();

        let elements = Object.entries(formData).map(function (arr) {
            return (arr[1].length > 0) ? `${arr[0]}=${arr[1].toUpperCase()}` : '';
        });

        const urlParams = elements.filter(n => n).join('&');
        const response = await (new ProductService()).get(urlParams);
        const productsData = response.data;

        setProductList(productsData);

        if (Object.keys(productsData).length) {
            const productId = productsData[0].id;
            const tableRow = tableRef.current.querySelector(`tbody tr[data-id="${productId}"]`);

            tableRow.focus();
        }
    }, [formData]);

    const addProductToCart = useCallback((product) => {
        const message = `O item ${product.tipo} ${product.sub_descricao} ${product.marca} já foi adicionado, deseja aumentar a quantidade?`;
        const productIndex = products.findIndex(currentProduct => currentProduct.id === product.id);
        const order = new Order();

        const tableRow = tableRef.current.querySelector(`tbody tr[data-id="${product.id}"]`);
        tableRow.focus();
        setRowSelected(productList.findIndex(currentProduct => currentProduct.id === product.id));

        if (productIndex < 0) {
            order.create(product.id).then(response => {
                setProducts([...products, response.data]);
            });
        } else {
            if (window.confirm(message)) {
                order.create(product.id).then(response => {
                    const productsSwap = [...products];
                    productsSwap[productIndex] = response.data;
                    setProducts(productsSwap);
                });
            }
        }

    }, [productList, products, setProducts]);

    const moveCursor = useCallback((e) => {
        const ENTER = 13;
        const TAB = 9;
        const UP = 38;
        const DOWN = 40;

        if (!!tableRef.current.children.tbody === false) {
            e.preventDefault();
            manufacturerInput.current.focus();

            return true;
        }

        const product = productList[rowSelected];

        const tableRow = tableRef.current.querySelector(`tbody tr[data-id="${product.id}"]`);

        tableRow.focus();

        switch (e.keyCode) {
            case TAB:
                e.preventDefault();
                manufacturerInput.current.focus();
                break;
            case ENTER:
                addProductToCart(product);
                break;
            case UP:
                if (rowSelected > 0) {
                    setRowSelected(rowSelected - 1);
                }

                break;
            case DOWN:
                if ((rowSelected + 1) < productList.length) {
                    setRowSelected(rowSelected + 1);
                }

                break;
            default:
                break;
        }
    }, [addProductToCart, productList, rowSelected]);

    useEffect(() => {
        manufacturerInput.current.focus();
    }, []);

    return (
        <div className="page-modal">
            <div>
                <form onSubmit={getProductList}>
                    <div className="form-row pl-1 pt-1">
                        <div className="col">
                            <input type="text" onChange={handleChange} className="form-control" placeholder="Fabricante" name="fabricante" ref={manufacturerInput} />
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
                            <th scope="col">Codigo</th>
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
                            productList.map(function (product, index) {
                                return (
                                    <tr key={product.id} data-id={product.id} tabIndex={index} className={index === rowSelected ? 'table-success' : 'table-light'} onClick={() => addProductToCart(product)}>
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