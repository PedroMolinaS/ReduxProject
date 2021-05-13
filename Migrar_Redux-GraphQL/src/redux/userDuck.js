import { loginWithGoogle, signOutGoogle } from "../firebase"
import { getFavoritesAction } from "./charsDuck"

// Constants
let LOGIN = 'LOGIN'
let LOGIN_SUCCESS = 'LOGIN_SUCCESS'
let LOGIN_ERROR = 'LOGIN_ERROR'
let LOGOUT = 'LOGOUT'
let initialState = {
    loggedIn: false,
    fetching: false,
}

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                fetching: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                loggedIn: true,
                ...action.payload,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        case LOGOUT:
            return {...initialState}
        default:
            return state;
    }
}

// Aux
const saveLocalStorage = (storage) => {
    localStorage.setItem('storage', JSON.stringify(storage));
}

// Actions Creators
export const logOutAction = () => (dispatch) => {
    localStorage.removeItem('storage')
    dispatch({
        type: LOGOUT,
    })
    signOutGoogle()
}

export const restoreSessionAction = () => (dispatch) => {
    if (localStorage.getItem('storage')) {
        let { user } = JSON.parse(localStorage.getItem('storage'))
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {...user}
        })
    }
}

export const doLoginWithGoogleAction = () => (dispatch, getState) => {

    dispatch({
        type: LOGIN,
    })

    return loginWithGoogle()
        .then(user => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,

                }
            })
            saveLocalStorage(getState())
            getFavoritesAction()(dispatch,getState)
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.message,
            })
        })
}
