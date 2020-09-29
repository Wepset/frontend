import React, { useCallback, useState } from 'react';

import PersonService from '../../http/Person.js';

const Person = ({ informeParent = f => f }) => {
    const [formData, setFormData] = useState({
        fantasia: '',
        razao_social_nome: '',
    });
    const [people, setPeople] = useState([]);

    const handleChange = useCallback((e) => {
        setFormData({ [e.target.name]: e.target.value });
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        let elements = Object.entries(formData).map(function (arr) {
            return (arr[1].length > 0) ? `${arr[0]}=${arr[1].toUpperCase()}` : '';
        });

        const urlParams = elements.filter(n => n).join('&');
        const response = await (new PersonService()).get(urlParams);
        const personData = response.data;

        setPeople(personData);
    }, [formData]);

    return (
        <div className="page-modal">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row pl-1 pt-1">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Fantasia" name="fantasia" onChange={handleChange} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Razao Social/Nome" name="razao_social_nome" onChange={handleChange} />
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary mb-2">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="overflow-auto max-height-modal-grid">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">CODIGO</th>
                            <th scope="col">RAZAO SOCIAL</th>
                            <th scope="col">FANTASIA</th>
                            <th scope="col">CNPJ/CPF</th>
                            <th scope="col">IE</th>
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
                        {people.map(function (person) {
                            return (
                                <tr key={person.id} onClick={() => informeParent(person)}>
                                    <td>{person.id}</td>
                                    <td>{person.razao_social_nome}</td>
                                    <td>{person.fantasia}</td>
                                    <td>{person.cnpj_cpf}</td>
                                    <td>{person.ie}</td>
                                    <td>{person.endereco}</td>
                                    <td>{person.num}</td>
                                    <td>{person.bairro}</td>
                                    <td>{person.cidade}</td>
                                    <td>{person.uf}</td>
                                    <td>{person.telefone}</td>
                                    <td>{person.cep}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Person;