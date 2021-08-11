import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INITIAL_STATE = {
    userId: null,
    token: null,
    error: null,
    loading: false,
    redirectUrl: '/',
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.AUTH_FAIL: 
            return updateObject(state, {error: action.error, loading: false,});
        case actionTypes.AUTH_START: 
            return updateObject(state, {loading: true,});
        case actionTypes.AUTH_SUCCESS: 
            return updateObject(state, {userId: action.userId, token: action.token, loading: false,});
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {userId: null, token: null});
        case actionTypes.SET_REDIRECT_URL:
            return updateObject(state, {redirectUrl: action.path});
        default:
            return state;
    }
    //return state;
}

export default reducer;