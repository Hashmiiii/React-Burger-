import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

const INITIAL_STATE = {
    // ingredients : {
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0,
    //     salad: 0,
    // },
    ingredients: null,
    totalPrice : 4,
    error: false,
    building: false,
};

const initBurgerBuilder = (state, action) => {
    const updateValues = {
        ingredients: action.ingredients,
        totalPrice: INITIAL_STATE.totalPrice,
        error: false,
        building: true,
    };
    return updateObject(state, updateValues);
}

const addIngredient = (state, action) => {
    const newIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1,};
    const UpdatedIngredients = updateObject(state.ingredients, newIngredient) 
    const updatedValues = {
        ingredients: UpdatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updatedValues);
}

const removeIngredient = (state, action) => {
    const newIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1,};
    const UpdatedIngredients = updateObject(state.ingredients, newIngredient) 
    const updatedValues = {
        ingredients: UpdatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updatedValues);
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: 
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: 
            return removeIngredient(state, action);
        case actionTypes.ON_INIT_BURGER_BUILDER: 
            return initBurgerBuilder(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return updateObject(state, {error: action.error});
        default:
            return state;
    }
    //return state;
}

export default reducer;