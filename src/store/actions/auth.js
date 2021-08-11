import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: authData.localId,
        token: authData.idToken,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const onSignUp = (authenticationData) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: authenticationData.email,
            password: authenticationData.password,
            returnSecureToken: true,
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDyKi4TZZw2dO25HTiwUlRSE09QiT3Gt4U', authData)
        .then(response => {
            dispatch(authSuccess(response.data));
        })
        .catch(error => {
            dispatch(authFail(error));
        });
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const setRedirectUrl = (url) => {
    return {
        type: actionTypes.SET_REDIRECT_URL,
        path: url,
    }
}

export const checkAuthentication = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        },expirationTime*1000);
    }
}

export const onSignIn = (authenticationData) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: authenticationData.email,
            password: authenticationData.password,
            returnSecureToken: true,
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDyKi4TZZw2dO25HTiwUlRSE09QiT3Gt4U', authData)
        .then(response => {
            let expirationTime = new Date(new Date().getTime() + (response.data.expiresIn*1000));
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationTime);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthentication(response.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFail(err.response.data.message));
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }
        else{
            const userId = localStorage.getItem('userId');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(authLogout());
            }
            else{
                dispatch(authSuccess({
                    localId: userId,
                    idToken: token,
                }));
                dispatch(checkAuthentication((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}