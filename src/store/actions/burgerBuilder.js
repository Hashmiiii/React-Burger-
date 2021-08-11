import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName: ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: ingredientName
    }
}

const initIngredeients = (ingredients) => {
    return {
        type: actionTypes.ON_INIT_BURGER_BUILDER, 
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED, 
        error: true,
    }
}

export const onInitIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(response => {
                dispatch(initIngredeients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            })
    }
}

export const onInitIngredientsOld = (ingredients) => {
    return {
        type: actionTypes.ON_INIT_BURGER_BUILDER, 
        ingredients: ingredients
    }
}