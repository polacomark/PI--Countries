import React from 'react'
import  './Paginado.css'


export default function Paginado({countriesPg, filters, paginado}){
    const pgNumber = [];

   
    //recorremos el arreglo de numeros por la divicion de math.ceil(redondea)
    for(let i=1; i<=Math.ceil(filters/countriesPg); i++){
        pgNumber.push(i);
    }
   
    return (
        <nav>
          <ul className="pages">
            {pgNumber &&
              pgNumber.map((number) => (
                <li className="li" key={number}>
                  <button className='paging' onClick={() => paginado(number)}>   {number} </button>
                </li>
              ))}
          </ul>
        </nav>
      );
    }