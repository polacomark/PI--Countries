import React from 'react';
import CardCountry from './CardCountry';


export default function CardsCountries({allCountries}){
    return (
        <>
        
        <section >
            {allCountries?.map(country => 
                <CardCountry 
                key={country.id}
                id={country.id}
                flags={country.flags}
                name={country.name}
                continents={country.continents}
                population={country.population} 
                />
                )}
        </section>
       
        </>
    )
}