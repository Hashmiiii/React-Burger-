import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const INITIAL_STATE = {
    orders: [],
    error: null,
    loading: false,
    purchased: true,
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId,});
    const updatedValues = {
        orders: state.orders.concat(newOrder),
        error: null,
        loading: false,
        purchased: true,
    };
    return updateObject(state, updatedValues);
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.INIT_PURCHASED:
            return updateObject(state, {purchased: false,});
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: 
            return updateObject(state, {error: action.error, loading: false,});
        case actionTypes.LOADER_ON_START: 
            return updateObject(state, {loading: true,});
        case actionTypes.FETCH_ORDER_SUCCESS: 
            return updateObject(state, {orders: action.orders, loading: false,});
        case actionTypes.FETCH_ORDER_FAIL: 
            return updateObject(state, {error: action.error, loading: false,});
        default:
            return state;
    }
    //return state;
}

export default reducer;