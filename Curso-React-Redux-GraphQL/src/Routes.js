import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/HomePage'
import FavPage from './components/favs/FavPage'
import LoginPage from './components/login/LoginPage'
import {connect} from 'react-redux'

const PrivateRoute = ({logueado,path, component, ...rest}) => {
    
    // Mediante LocalStorage

    // let storageString = localStorage.getItem('storage')
    // let storage = JSON.parse(storageString)
    // if(storage && storage.user){
        // return <Route path={path} component={component} {...rest} />
    // }

    // Mediante Redux
    if(logueado){
        return <Route path={path} component={component} {...rest} />
    }
    return <Redirect to={"/login"} {...rest} />
}

function Routes({logueado}) {
    return (
        <Switch>
            <PrivateRoute logueado={logueado} path="/favs" component={FavPage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute logueado={logueado} path="/" component={Home} />
        </Switch>
    )
}

const mapStateToProps = (state) => {
    
    if(state && state.user){
        return {logueado: state.user.loggedIn}
    }
    return {logueado: false}
}

export default connect(mapStateToProps)(Routes)