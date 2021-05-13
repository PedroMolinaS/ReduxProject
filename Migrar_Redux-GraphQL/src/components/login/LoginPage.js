import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { doLoginWithGoogleAction, logOutAction } from '../../redux/userDuck'

const LoginPage = ({ fetching, loggedIn, doLoginWithGoogleAction, logOutAction }) => {

    const loginGoogle = () => {
        doLoginWithGoogleAction()
    }
    const logOutGoogle = () => {
        logOutAction()
    }
    if (fetching) return <h2>Cargando...</h2>

    return (
        <div className={styles.container}>
            {
                loggedIn ?
                    <>
                        <h1>Cierra tu sesión</h1>
                        <button onClick={logOutGoogle}>Cerrar Sesión</button>
                    </>
                    :
                    <>
                        <h1>Inicia Sesión con Google</h1>
                        <button onClick={loginGoogle}>Iniciar</button>
                    </>
            }
        </div>
    )
}

const mapStateToProps = ({ user: { fetching, loggedIn } }) => {
    return { fetching, loggedIn }
}

export default connect(mapStateToProps, { doLoginWithGoogleAction, logOutAction })(LoginPage)
