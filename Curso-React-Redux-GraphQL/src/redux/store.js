import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import userReducer, { restoreSessionAction } from './userDuck'
import charsReducer, { getCharacterAction } from './charsDuck'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    user: userReducer,
    characters: charsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
    let store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )

    // Consigo los personajes por 1ra vez
    getCharacterAction()(store.dispatch, store.getState)
    restoreSessionAction()(store.dispatch)

    return store
}

export default generateStore