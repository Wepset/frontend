import React, { useEffect, useState } from 'react';

import Arrow from './../Arrow/Arrow.jsx';
import PDF from './../PDF/PDF.jsx';
import CSV from './../CSV/CSV.jsx';

import BoxSearch from '../../components/Modal/Box.js'
import Consumer from '../../http/Consumer.js';

import Close from './../../images/x.png';
import Art from './../../images/art-document---v2.png';
import View from './../../images/perspective-view.png';

import './Consumer.css';

const ConsumerConst = () => {
    const [consumers, setConsumers] = useState([]);

    useEffect(() => {
        const Box = new BoxSearch({
            csv: Consumer.CSV,
            pdf: Consumer.PDF
        });

        Box.run();
    });

    function getConsumers(e) {
        e.preventDefault();

        const form = new FormData(e.target);

        const args = {
            fantasia: form.get('fantasia'),
            razao_social_nome: form.get('razao_social_nome')
        };

        const consumer = new Consumer();

        consumer.get(args).then(response => {
            setConsumers(response.data);
        });
    }

    return (
        <div className="blurry box">

            <div className="cursor" style={{ "backgroundColor": "#143e82", "borderRadius": "7px" }}>
                <span className="main-title">
                    <div className="d-flex justify-content-md-start align-items-center text-light" style={{ "fontSize": "1.4rem", "fontWeight": "bold" }}>
                        <span>Busca: Pessoa</span>
                    </div>
                </span>
                <div className="close-popup">
                    <img src={Close} alt="Close" />
                </div>
            </div>

            <div>
                <form onSubmit={getConsumers}>
                    <div className="form-row pl-1 pt-1">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Fantasia" name="fantasia" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Razao Social/Nome" name="razao_social_nome" />
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary mb-2">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="overflow-auto" style={{ "maxHeight": "275px" }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"># <Arrow type="up" /> </th>
                            <th scope="col">CODIGO</th>
                            <th scope="col">RAZAO SOCIAL</th>
                            <th scope="col">FANTASIA</th>
                            <th scope="col">CNPJ/CPF</th>
                            <th scope="col">IE <Arrow type="down" /> </th>
                            <th scope="col">ENDERECO </th>
                            <th scope="col">NUM</th>
                            <th scope="col">BAIRRO</th>
                            <th scope="col">CIDADE</th>
                            <th scope="col">UF</th>
                            <th scope="col">TELEFONE</th>
                            <th scope="col">CEP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            consumers.map(function (value, index, array) {
                                return (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>{value.codigo}</td>
                                        <td>{value.razao_social_nome}</td>
                                        <td>{value.fantasia}</td>
                                        <td>{value.cnpj_cpf}</td>
                                        <td>{value.ie}</td>
                                        <td>{value.endereco}</td>
                                        <td>{value.num}</td>
                                        <td>{value.bairro}</td>
                                        <td>{value.cidade}</td>
                                        <td>{value.uf}</td>
                                        <td>{value.telefone}</td>
                                        <td>{value.cep}</td>
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

export default ConsumerConst;