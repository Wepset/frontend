import React from 'react';

import LogoIcon from './../../images/logo.svg';

function Logo() {
    return (
        <img id="logo" src={LogoIcon} alt="Logo" className="img-fluid" />
    );
}

export default Logo;