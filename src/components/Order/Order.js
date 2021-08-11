import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredient in props.ingredients){
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    const ingredientsOutput = ingredients.map(ingredient => (
        <span key={ingredient.name}>{ingredient.name} {ingredient.amount}</span>
    ));

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;