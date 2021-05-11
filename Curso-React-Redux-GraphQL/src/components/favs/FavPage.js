import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect} from 'react-redux'

const  FavPage = ({ favorites }) => {
    
    function renderCharacter(char, i) {
        // console.log(char);
        return (
            <Card key={i} {...char} hide />
        )
    }
    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {favorites.map(renderCharacter)}
            {!favorites.length && <h3>No hay personajes agregados</h3>}
        </div>
    )
}

const mapStateToProps = ({characters:{favorites = []}}) => {

    return {favorites}
}

export default connect(mapStateToProps)(FavPage)