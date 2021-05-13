import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

const GraphHome = () => {

    const [chars, setChars] = useState([])
    let query = gql`
    {
        characters{
            results{
                name
                image
            }
        }
    }`

    let { data, loading, error } = useQuery(query)

    const nextCharacter = () => {
        chars.shift()
        setChars([...chars])
    }

    useEffect(()=>{
        if(!loading && !error && data){
            setChars([...data.characters.results])
        }
    },[data])


    if (loading) return <div>Cargando...</div>
    
    return (
        <Card {...chars[0]} leftClick={nextCharacter} />

    )
}

export default GraphHome
