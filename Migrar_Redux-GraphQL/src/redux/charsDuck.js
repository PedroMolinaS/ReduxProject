import axios from 'axios'
import { getFavoritesFirebase, updateDB } from '../firebase'
import ApolloClient, { gql } from 'apollo-boost'

// Constants
let initialState = {
    fetching: false,
    array: [],
    current: {},
    favorites: [],
    fetchingArr: false,
}
let URL = "https://rickandmortyapi.com/api/character"
let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql"
})

let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
let REMOVE_CHARACTER = "REMOVE_CHARACTER"
let ADD_FAVORITES = "ADD_FAVORITES"
let GET_FAVORITES = "GET_FAVORITES"
let GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS"
let GET_FAVORITES_ERROR = "GET_FAVORITES_ERROR"
let UPDATE_CHARACTERS = "UPDATE_CHARACTERS"

// Reducer
export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_CHARACTERS:
            return {
                ...state,
                fetching: true,
            }
        case GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                array: action.payload,
                fetching: false,
            }
        case GET_CHARACTERS_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        case REMOVE_CHARACTER:
            return {
                ...state,
                array: action.payload,
            }
        case ADD_FAVORITES:
            return {
                ...state,
                array: action.payload.array,
                favorites: action.payload.favorites,
                // ...action.payload,
            }
        case GET_FAVORITES:
            return {
                ...state,
                fetchingArr: true,
            }
        case GET_FAVORITES_ERROR:
            return {
                ...state,
                fetchingArr: false,
                errorFav: action.payload
            }
        case GET_FAVORITES_SUCCESS:
            return {
                ...state,
                ...action.payload,
                fetchingArr: false,
            }
        case UPDATE_CHARACTERS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

// Actions (thunk)
export const getFavoritesAction = () => (dispatch, getState) => {

    let { uid } = getState().user
    let { array } = getState().characters
    let characters = getState().characters
    let storage = getState()

    dispatch({
        type: GET_FAVORITES,
    })

    return getFavoritesFirebase(uid)
        .then(favorites => {
            favorites.forEach(fav => {
                array = array.filter(arr => arr.id !== fav.id)
            })
            dispatch({
                type: GET_FAVORITES_SUCCESS,
                payload: { favorites: [...favorites], array: [...array] }
            })

            let new_characters = {
                ...characters,
                array: [...array],
                favorites: [...favorites],
            }
            let new_storage = {
                ...storage,
                characters: new_characters,
            }
            let new_storage_string = JSON.stringify(new_storage)

            // Actualizo el localStorage
            localStorage.setItem('storage', new_storage_string)
        })
        .catch(err => {
            dispatch({
                type: GET_FAVORITES_ERROR,
                payload: err.message
            })
        })

}

export const addToFavoritesAction = () => (dispatch, getState) => {
    let { array, favorites } = getState().characters
    let { uid } = getState().user

    if (array.length > 0 && uid !== undefined) {
        let favorite = array.shift()
        // favorites.unshift(favorites) // agrego al inicio el elemento
        favorites.push(favorite) // agrego al final el elemento
        updateDB(favorites, uid)

        dispatch({
            type: ADD_FAVORITES,
            payload: {
                array: [...array],
                favorites: [...favorites],
            }
        })
    }
}

export const removeCharacterAction = () => (dispatch, getState) => {
    let { array } = getState().characters
    array.shift()
    if (array.length > 0) {
        dispatch({
            type: REMOVE_CHARACTER,
            payload: [...array]
        })
    }
}


export const getCharacterAction = () => (dispatch, getState) => {


    let us = {}
    let chars = {}
    if (localStorage.getItem('storage')) {
        let { user, characters } = JSON.parse(localStorage.getItem('storage'))
        us = user
        chars = characters
    }

    dispatch({
        type: GET_CHARACTERS
    })

    // MEDIANTE GRAPHQL
    let query = gql`
        {
            characters{
                results{
                    name
                    image
                }
            }
        }
    `
    return client.query({
        query
    }).then(({ data, error }) => {
        if (error) {
            dispatch({
                type: GET_CHARACTERS_ERROR,
                param: error
            })
            return
        }
        if (us.loggedIn && chars?.favorites?.length !== undefined) {
            dispatch({
                type: UPDATE_CHARACTERS,
                payload: { ...chars },
            })
        } else {
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                param: data.characters.results
            })
        }

    })


    // MEDIANTE AXIOS
    // return axios.get(URL)
    //     .then(res => {
    //         if (us.loggedIn && chars?.favorites?.length !== undefined) {
    //             dispatch({
    //                 type: UPDATE_CHARACTERS,
    //                 payload: { ...chars },
    //             })
    //         } else {
    //             dispatch({
    //                 type: GET_CHARACTERS_SUCCESS,
    //                 payload: res.data.results,
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         dispatch({
    //             type: GET_CHARACTERS_ERROR,
    //             payload: err.response.message,
    //         })
    //     })

}


