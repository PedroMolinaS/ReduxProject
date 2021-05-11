import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import charReducer, { getCharactersAction } from './charsDuck'
import userReducer from './userDuck'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    chars: charReducer,
    users: userReducer,
})

const generateStore = () => {
    let store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )

    //Aqui hago llamado a la obtención de datos desde el inicio
    getCharactersAction()(store.dispatch, store.getState)

    return store
}

export default generateStore