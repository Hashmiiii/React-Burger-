import React from 'react';
import Aux from '../../../hoc/ReactAux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span>
            </li>
        );
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following Ingredients:</p>
            <ul>
                {transformedIngredients}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;