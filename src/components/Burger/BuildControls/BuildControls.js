import React from 'react';
import classses from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'}
];

const buildControls = (props) => {
    return (<div className={classses.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => {
              return <BuildControl 
                        key={control.label} 
                        label={control.label}
                        added={() => props.ingredientAdded(control.type)}
                        removed={() => props.ingredientRemoved(control.type)}
                        disabledInfo={props.disabledInfo[control.type]}></BuildControl>
        })}
        <button className={classses.OrderButton} 
                disabled={props.purchasable} 
                onClick={props.ordered}>
                {props.isAuthenticated ? 'ORDER NOW': 'SIGNIN TO ORDER'}
        </button>
    </div>);
};

export default buildControls;