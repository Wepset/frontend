import React, { useCallback, useEffect, useRef, useState } from 'react';

import Keys from '../../repositories/KeyCodeRepository.js';

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

    /**
     * Get the message to add a product to cart.
     * 
     * @param {Object} product
     * 
     * @return {String}
     */
    function message(Product) {
        return `O item ${Product.tipo} ${Product.sub_descricao} ${Product.marca} já foi adicionado, deseja aumentar a quantidade?`;
    }

    const addProductToCart = useCallback((product) => {
        const productIndex = products.findIndex(currentProduct => currentProduct.id === product.id);

        setFocusOnRow(product.id);

        setRowSelected(productList.findIndex(currentProduct => currentProduct.id === product.id));

        if (productIndex < 0) {
            (new Order()).create(product.id).then(response => {
                setProducts([...products, response.data]);
            });
        } else {
            if (window.confirm(message(product))) {
                (new Order()).create(product.id).then(response => {
                    const productsSwap = [...products];
                    productsSwap[productIndex] = response.data;
                    setProducts(productsSwap);
                });
            }
        }

    }, [productList, products, setProducts]);

    /**
     * Set focus on manufacturer input.
     * 
     * @param {Object} e 
     * 
     * @return {Boolean}
     */
    function setFocusOnManufacturer(e) {
        e.preventDefault();
        manufacturerInput.current.focus();

        return true;
    }

    /**
     * Set focus on tr.
     * 
     * @param {Integer} id
     * 
     * @return {Boolean}
     */
    function setFocusOnRow(id) {
        const tableRow = tableRef.current.querySelector(`tbody tr[data-id="${id}"]`);

        tableRow.focus();

        return true;
    }

    const moveCursor = useCallback((e) => {
        let rowCounter = tableRef.current.querySelectorAll(`tbody tr`).length;
        let __ROW = rowSelected;

        if (rowCounter === 0) {
            return setFocusOnManufacturer(e);
        }

        const product = productList[__ROW];

        setFocusOnRow(product.id);

        switch (e.keyCode) {
            case Keys.TAB:
                return setFocusOnManufacturer(e);

            case Keys.ENTER:
                addProductToCart(product);

                break;
            case Keys.UP:
                if (__ROW > 0) {
                    __ROW--;
                }

                break;
            case Keys.DOWN:
                if ((__ROW + 1) < productList.length) {
                    __ROW++;
                }

                break;
            default:
                break;
        }

        setRowSelected(__ROW);
    }, [addProductToCart, productList, rowSelected]);

    useEffect(() => {
        manufacturerInput.current.focus();
    }, []);

    return (
        <div className="page-modal">
            <form onSubmit={getProductList}>
                <div className="form-row pl-1 pt-1 pb-2">
                    <div className="col">
                        <label htmlFor="fabricante">Fabricante</label>
                        <input type="text" onChange={handleChange} className="form-control" name="fabricante" ref={manufacturerInput} />
                    </div>
                    <div className="col">
                        <label htmlFor="fabricante">Tipo</label>
                        <input type="text" onChange={handleChange} className="form-control" placeholder="" name="tipo" />
                    </div>
                    <div className="col">
                        <label htmlFor="fabricante">Sub Descrição</label>
                        <input type="text" onChange={handleChange} className="form-control" name="sub_descricao" />
                    </div>
                    <div className="col">
                        <label htmlFor="fabricante">Observação</label>
                        <input type="text" onChange={handleChange} className="form-control" name="obs" />
                    </div>
                    <div className="col">
                        <label htmlFor="fabricante">Composição</label>
                        <input type="text" className="form-control" name="composicao" />
                    </div>
                    <div className="col d-flex align-items-end">
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </div>
                </div>
            </form>

            <div>
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