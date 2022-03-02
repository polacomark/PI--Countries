import React from 'react';
import {Link} from 'react-router-dom';


export default function CardCountry({id, flags, name, continents,population}){
    //console.log(activity)
    return(
        <>
         <div  key={id}> 
            <div >
                <img  src={flags} alt='flag' />
            </div>
            <div >
                <Link   to={`/countries/${id}`}>{id}</Link>
                    <h1 > ~ {name} ~ </h1>
                    <h2 >Continent: {continents}</h2>
                    <h2 >Population: {population} inhabitans</h2>     
            </div>
       </div> 
        </>
    )
}