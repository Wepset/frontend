import React from 'react';

import img from '../../images/db_icones.png';

import '../Icon/Icon.css';

function Icon(props) {
    return (
        <img src={img} className={props.label} alt={props.alt} />
    );
}

export default Icon;