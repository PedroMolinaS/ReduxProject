import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import charsReducer, {getCharacterAction} from './charsDuck'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    chars: charsReducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () =>{

    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    )

    // 1ra vez para obtener los personajes
    getCharacterAction()(store.dispatch, store.getState)

    return store
}

export default generateStore