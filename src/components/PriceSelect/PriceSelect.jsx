import React from 'react';

function PriceSelect({ product }) {
    return (
        <select className="form-control form-control-sm">
            {
                product.preco_venda.map(function (price, index) {
                    return <option key={index} value={parseFloat(price.value)}>{price.label}</option>;
                })
            }
        </select>
    );
}

export default PriceSelect;
