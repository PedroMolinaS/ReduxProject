import axios from 'axios'

// Constants
const URL = 'https://rickandmortyapi.com/api/character'
const initialState = {
    fetching: false,
    array: [],
    current: {},
}
const GET_CHARACTERS = 'GET_CHARACTERS'
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR'
const REMOVE_CHARACTER = 'REMOVE_CHARACTERS'

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHARACTERS:
            return {
                ...state,
                fetching: true,
            }
        case GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                array: action.payload,
            }
        case GET_CHARACTERS_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case REMOVE_CHARACTER:
            return {
                ...state,
                array: action.payload,
            }
        default:
            return state
    }
}

// Action Creator
export const removeCharacterAction = () => (dispatch, getState) => {
    // console.log(getState());
    let {array} = getState().chars
    array.shift()
    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array],
    })
}

export const getCharactersAction = () => (dispatch, getState) => {
    dispatch({
        type: 'GET_CHARACTERS'
    })

    return axios.get(URL)
        .then((response) => {
            // console.log(response)
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: response.data.results
            })
        })
        .catch((error) => {
            console.log(error)
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: error.response.message,
            })
        })
}


export default reducer