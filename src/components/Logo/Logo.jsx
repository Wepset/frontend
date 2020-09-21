import React from 'react';

import LogoIcon from './../../images/logo.svg';

function Logo() {
    return (
        <img src={LogoIcon} alt="Logo" className="img-fluid" style={{height: '60px'}} />
    );
}

export default Logo;