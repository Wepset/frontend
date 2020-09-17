import React, { useEffect, useState } from 'react';

import BoxScript from './Box.js';

import Arrow from './../Arrow/Arrow.jsx';

import BoxSearch from '../../components/Modal/Box.js'

import Pdf from './export-pdf.png';
import Csv from './import-csv.png';

import Close from './x.png';
import Art from './art-document---v2.png';
import View from './perspective-view.png';

import './Modal.css';
import Product from '../../http/Product.js';

const Box = () => {
    const [products, setProducts] = useState([]);

    function handleListing() {
        return {
            header: {
                fields: [
                    "id",
                    "names",
                    "names_regional",
                    "phone_fax",
                    "phone_fax_regional",
                    "email",
                    "date",
                    "company",
                    "siret",
                    "chilean_rut_number"
                ]
            },
            data: [
                {
                    "id": 1,
                    "names": "Warner, Janna Y.",
                    "names_regional": "Mccormick",
                    "phone_fax": "(076) 37124626",
                    "phone_fax_regional": "(392) 274-1270",
                    "email": "Aenean.eget@interdumSed.ca",
                    "date": "2021-02-22 10:34:47",
                    "company": "Fringilla Cursus Ltd",
                    "siret": "490145067-00008",
                    "chilean_rut_number": "38411828-3"
                },
                {
                    "id": 2,
                    "names": "Gregory, Wing K.",
                    "names_regional": "Rojas",
                    "phone_fax": "(050) 41840501",
                    "phone_fax_regional": "(127) 381-5024",
                    "email": "scelerisque.sed.sapien@diamSed.co.uk",
                    "date": "2021-02-06 03:26:11",
                    "company": "Libero Mauris Aliquam LLP",
                    "siret": "761095397-00003",
                    "chilean_rut_number": "46584732-8"
                },
                {
                    "id": 3,
                    "names": "Clay, Patrick W.",
                    "names_regional": "Hyde",
                    "phone_fax": "(0439) 77955511",
                    "phone_fax_regional": "(242) 221-9443",
                    "email": "consectetuer.adipiscing@atlacus.co.uk",
                    "date": "2019-09-24 05:55:06",
                    "company": "Lacus Limited",
                    "siret": "434496618-00001",
                    "chilean_rut_number": "22274925-5"
                },
                {
                    "id": 4,
                    "names": "Harrell, Alexander U.",
                    "names_regional": "Burke",
                    "phone_fax": "(08044) 4019559",
                    "phone_fax_regional": "(158) 686-3348",
                    "email": "Duis.ac@mollis.net",
                    "date": "2020-05-06 05:10:11",
                    "company": "Adipiscing Elit Etiam Industries",
                    "siret": "635327703-00008",
                    "chilean_rut_number": "31596408-3"
                },
                {
                    "id": 5,
                    "names": "Monroe, Shaeleigh U.",
                    "names_regional": "Kane",
                    "phone_fax": "(005) 48478742",
                    "phone_fax_regional": "(892) 943-6136",
                    "email": "mauris@tellusimperdiet.com",
                    "date": "2021-02-16 05:11:56",
                    "company": "Justo Associates",
                    "siret": "900061359-00007",
                    "chilean_rut_number": "48629209-1"
                },
                {
                    "id": 6,
                    "names": "Haynes, Jackson R.",
                    "names_regional": "Rivera",
                    "phone_fax": "(090) 04656120",
                    "phone_fax_regional": "(156) 827-6700",
                    "email": "in.felis@justoeu.co.uk",
                    "date": "2020-03-30 05:29:38",
                    "company": "Sodales Company",
                    "siret": "902700749-00002",
                    "chilean_rut_number": "43050540-8"
                },
                {
                    "id": 7,
                    "names": "King, Glenna H.",
                    "names_regional": "Payne",
                    "phone_fax": "(033576) 190896",
                    "phone_fax_regional": "(780) 210-0181",
                    "email": "sit.amet@dignissimpharetra.com",
                    "date": "2019-11-30 16:44:43",
                    "company": "Nunc Quisque Ornare Limited",
                    "siret": "716098983-00001",
                    "chilean_rut_number": "6359493-8"
                },
                {
                    "id": 8,
                    "names": "Ray, Macey O.",
                    "names_regional": "Mason",
                    "phone_fax": "(082) 14638071",
                    "phone_fax_regional": "(946) 109-6765",
                    "email": "Etiam@Incondimentum.net",
                    "date": "2019-11-21 11:22:31",
                    "company": "Dis Parturient Montes Company",
                    "siret": "647984830-00008",
                    "chilean_rut_number": "32284902-8"
                },
                {
                    "id": 9,
                    "names": "Stokes, Colton C.",
                    "names_regional": "Randall",
                    "phone_fax": "(00920) 6975743",
                    "phone_fax_regional": "(167) 583-4549",
                    "email": "nec@orciUtsagittis.edu",
                    "date": "2020-06-08 00:44:24",
                    "company": "Duis Mi Enim PC",
                    "siret": "695561241-00008",
                    "chilean_rut_number": "49167599-3"
                },
                {
                    "id": 10,
                    "names": "Matthews, Damian R.",
                    "names_regional": "Decker",
                    "phone_fax": "(031706) 106498",
                    "phone_fax_regional": "(176) 249-4331",
                    "email": "arcu@volutpatNullafacilisis.net",
                    "date": "2020-08-31 00:47:00",
                    "company": "Eros Turpis Inc.",
                    "siret": "908233588-00007",
                    "chilean_rut_number": "38069217-1"
                },
                {
                    "id": 11,
                    "names": "Blankenship, Zachary D.",
                    "names_regional": "Henderson",
                    "phone_fax": "(03465) 5285551",
                    "phone_fax_regional": "(708) 431-8521",
                    "email": "Integer.eu@tempor.co.uk",
                    "date": "2019-09-18 19:16:00",
                    "company": "Semper Pretium Neque Associates",
                    "siret": "858912710-00002",
                    "chilean_rut_number": "33782794-2"
                }
            ]
        };
    }

    useEffect(() => {
        const Box = new BoxSearch({
            csv: Product.CSV,
            pdf: Product.PDF
        });

        Box.run();
    });

    function getProducts(e) {
        e.preventDefault();

        const form = new FormData(e.target);

        const args = {
            fabricante: form.get('fabricante'),
            tipo: form.get('tipo'),
            sub_descricao: form.get('sub_descricao'),
            observacao: form.get('observacao'),
            composicao: form.get('composicao')
        };

        let data = (new Product()).get(args).then(response => {
            const data = response.data;

            setProducts(data);

            console.log(data);
        });
    }

    return (
        <div className="blurry box">

            <div className="cursor" style={{ "backgroundColor": "#143e82", "borderRadius": "7px" }}>
                <span className="main-title">
                    <div className="d-flex justify-content-md-start align-items-center text-light" style={{ "fontSize": "1.4rem", "fontWeight": "bold" }}><span>Busca: Item</span></div>
                </span>
                <div className="close-popup">
                    <img src={Close} alt="Close" />
                </div>
            </div>

            <div>
                <form onSubmit={getProducts}>
                    <div className="form-row pl-1 pt-1">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Fabricante" name="fabricante" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Tipo" name="tipo" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Sub Descrição" name="sub_descricao" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Observação" name="observacao" />
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
                <table className="table table-hover">
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
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>{value.fabricante}</td>
                                        <td>{value.medida}</td>
                                        <td>{value.tipo}</td>
                                        <td>{value.sub_descricao}</td>
                                        <td>{value.obs}</td>
                                        <td>{value.marca}</td>
                                        <td>{value.un}</td>
                                        <td>{value.qtd}</td>
                                        <td>{value.qtd}</td>
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
                <span onClick={(new BoxScript()).pdf()}><img src={Pdf} alt="Pdf" /></span>
                <span onClick={(new BoxScript()).csv()}><img src={Csv} alt="Csv" /></span>
                <img src={View} alt="Move" />
            </div>
        </div >
    )
}

export default Box;