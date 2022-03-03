import React from 'react';
import {Link} from 'react-router-dom';
import './card.css'


export default function CardCountry({id, flags, name, continents,population}){
    
    return( 
        <>
         <div className="constainer-cards" key={id}> 
            <div className='ca'>
                <Link  to={`/countries/${id}`}>
                <img className='container-cards__img' src={flags} alt='flag' />
                <h1 className='bread'>{name}</h1>
                </Link>
            </div>
            <div className='overly'>
                    <h2 className='titleTemps'>Continent: {continents}</h2>
                    <h2 className='titleTemps'>Population: {population} inhabitans</h2>   
            </div>
       </div> 
        </>
    )
}