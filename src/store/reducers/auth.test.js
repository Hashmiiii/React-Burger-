import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth Reducer', () => {
    it('State should be initial if undefined is passed', () => {
        expect(reducer(undefined, {})).toEqual({
            userId: null,
            token: null,
            error: null,
            loading: false,
            redirectUrl: '/',
        });
    })

    it('Token and userid should be set if action is AUTH_SUCCESS', () => {
        expect(reducer({
            userId: null,
            token: null,
            error: null,
            loading: false,
            redirectUrl: '/',
        }, {
            type: actionTypes.AUTH_SUCCESS,
            userId: 'some-userid',
            token: 'some-token',
        })).toEqual({
            userId: 'some-userid',
            token: 'some-token',
            error: null,
            loading: false,
            redirectUrl: '/',
        });
    })
});