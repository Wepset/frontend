import React from 'react';

function Arrow(props) {
    return (
        <img src={`https://img.icons8.com/dusk/16/000000/${props.type}.png`} alt={(props.type).charAt(0).toUpperCase() + (props.type).slice(1)} />
    );
}

export default Arrow;