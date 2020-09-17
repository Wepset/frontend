import React, { useEffect, useState } from 'react';

import Arrow from './../Arrow/Arrow.jsx';
import PDF from './../PDF/PDF.jsx';
import CSV from './../CSV/CSV.jsx';

import BoxSearch from '../../components/Modal/Box.js'
import Product from '../../http/Product.js';
import Order from '../../http/Order.js';

import Close from './../../images/x.png';
import Art from './../../images/art-document---v2.png';
import View from './../../images/perspective-view.png';

import './Product.css';

const Box = () => {
    /** @var {Array} */
    const [args, setArgs] = useState({
        fabricante: '',
        tipo: '',
        sub_descricao: '',
        obs: ''
    });

    /** @var {Array} */
    const [rowSelected, setRowSelected] = useState(1);

    /** @var {Array} */
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const Box = new BoxSearch({
            csv: Product.CSV,
            pdf: Product.PDF
        });

        Box.run();
    }, []);

    /**
     * setArgs
     * 
     * @param {Object} e
     */
    function handleSetArgs(e) {
        let state = args;

        state[e.target.name] = e.target.value;

        setArgs(state);
    }

    /**
     * getProducts
     * 
     * @param {Object} e 
     */
    async function getProducts(e) {
        e.preventDefault();

        let elements = Object.entries(args).map(function (arr) {
            return (arr[1].length > 0) ? `${arr[0]}=${arr[1].toUpperCase()}` : '';
        });

        const urlParams = elements.filter(n => n).join('&');
        const response = await (new Product()).get(urlParams);
        const products = response.data;

        setProducts(products);

        if (Object.keys(products).length) {
            const StrHTMLComponent = `tr[data-id="${products[0].id}"]`;

            document.querySelector(StrHTMLComponent).focus();
        }
    }

    /**
     * addProductToCart
     * 
     * @param {Integer} id 
     */
    function addProductToCart(id) {
        const str = `Adicionar produto #${id} ao carrinho?`;

        if (window.confirm(str)) {
            const request = (new Order()).create(id);

            request.then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    function MoveCursor(e) {
        const ENTER = 13;

        const LEFT = 37;
        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;

        let id = products[rowSelected].id;

        const StrHTMLComponent = `tr[data-id="${id}"]`;

        switch (e.keyCode) {
            case ENTER:
                addProductToCart(id);
                break;
            case LEFT:
                break;
            case UP:
                setRowSelected(rowSelected - 1);
                break;
            case RIGHT:
                break;
            case DOWN:
                setRowSelected(rowSelected + 1);
                break;
            default:
                break;
        }

        document.querySelector(StrHTMLComponent).focus();
    }

    return (
        <div className="blurry box">

            <div className="cursor dark-blue border-radius-title">
                <span className="main-title">
                    <div className="d-flex justify-content-md-start align-items-center text-light font-weight-bold title-font-size">
                        <span>Busca: Item</span>
                    </div>
                </span>
                <div className="close-popup">
                    <img src={Close} alt="Close" />
                </div>
            </div>

            <div>
                <form onSubmit={getProducts}>
                    <div className="form-row pl-1 pt-1">
                        <div className="col">
                            <input type="text" onChange={handleSetArgs} className="form-control" placeholder="Fabricante" name="fabricante" />
                        </div>
                        <div className="col">
                            <input type="text" onChange={handleSetArgs} className="form-control" placeholder="Tipo" name="tipo" />
                        </div>
                        <div className="col">
                            <input type="text" onChange={handleSetArgs} className="form-control" placeholder="Sub Descrição" name="sub_descricao" />
                        </div>
                        <div className="col">
                            <input type="text" onChange={handleSetArgs} className="form-control" placeholder="Observação" name="obs" />
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
                <table className="table table-hover" onKeyDown={MoveCursor} tabIndex="0">
                    <thead>
                        <tr>
                            <th scope="col"># <Arrow type="up" /> </th>
                            <th scope="col">Fabricante</th>
                            <th scope="col">Med</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Sub</th>
                            <th scope="col">Obs <Arrow type="down" /> </th>
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
                            products.map(function (value, index, array) {
                                return (
                                    <tr key={value.id} tabIndex="0" data-id={value.id} className={index === rowSelected ? 'table-success' : 'table-light'} onClick={() => { addProductToCart(value.id) }}>
                                        <td>{value.id}</td>
                                        <td>{value.fabricante}</td>
                                        <td>{value.medida}</td>
                                        <td>{value.tipo}</td>
                                        <td>{value.sub_descricao}</td>
                                        <td>{value.obs}</td>
                                        <td>{value.marca}</td>
                                        <td>{value.un}</td>
                                        <td>{Math.floor(Math.random() * 1000)}</td>
                                        <td>{Math.floor(Math.random() * 1000)}</td>
                                        <td>{value.preco_promocao}</td>
                                        <td>{value.preco_venda}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div>
                <img className="art absolute-left" src={Art} alt="Art" />
            </div>

            <div className="cursor absolute-right">
                <span onClick={(new BoxSearch()).pdf()}>
                    <PDF />
                </span>
                <span onClick={(new BoxSearch()).csv()}>
                    <CSV />
                </span>
                <img src={View} alt="Move" />
            </div>
        </div >
    )
}

export default Box;