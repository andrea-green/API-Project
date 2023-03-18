import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';


function List(props) {
    const history = useHistory();

    const allSpots = useSelector(state => state.Spots.allSpots);
    const data = Object.values(allSpots);
    const filteredData = data.filter(el => {
        console.log('el', 'props', el, props)
        if (props.city === '') {
            return el;
        } else {
            return el.city.toLowerCase().includes(props.input)
        }
    })

    return (
        <ul style={{listStyle:'none',paddingLeft:'0', border:'1px solid lightgray', marginTop:'3%', width:'fit-content'}}>
            {!!props.input.length &&
            (
                filteredData.map((item) => (
                    <li key={item.id} style={{cursor:'pointer'}} onClick={() => history.push(`/search/${item.city}`)}>{item.city}</li>
                ))
            )
            }
        </ul>
    )
}

export default List
