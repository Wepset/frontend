import React from 'react';

import img from '../../images/db_icones.png';
import './Icon.css';

function Icon({ label, alt, ...rest }) {
    return (
        <img src={img} className={label} alt={alt} {...rest} />
    );
}

export default Icon;