import React from 'react';

import Up from '../../images/up.png';
import Down from '../../images/down.png';

function Arrow(props) {
    if (props.display === true) {
        return <img src={props.direction === true ? Up : Down} alt="Sorting Direction" />
    }

    return <span />
}

export default Arrow;