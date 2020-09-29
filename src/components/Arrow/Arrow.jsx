import React from 'react';

import Up from './Up.jsx';
import Down from './Down.jsx';

function Arrow(props) {
    if (props.display === true) {
        if (props.direction) {
            return <Up />
        }

        return <Down />
    }

    return <span />;
}

export default Arrow;