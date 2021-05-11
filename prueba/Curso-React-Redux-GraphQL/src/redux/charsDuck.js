import axios from 'axios'

// constants
const URL = 'https://rickandmortyapi.com/api/character'
const initialState = {
    fetching: false,
    array: [],
    current: {}
}
let GET_CHARACTERS = 'GET_CHARACTERS'
let GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
let GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR'

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHARACTERS:
            return {
                ...state,
                fetching:true,
            }

        case GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                arrar: action.payload
            }
        case GET_CHARACTERS_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        default:
            return state
    }
}

// Action Creator
export const getCharacterAction = () => (dispatch, getState) => {

    dispatch({
        type: GET_CHARACTERS, 
    })

    return axios.get(URL)
        .then((response) =>{
            // console.log(response)
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: response.data.results,
            })
        })
        .catch((error) =>{
            console.log(error);
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: error.response.message
            })
        })
}