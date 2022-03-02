import React from "react";
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { getCountriesName } from "../../actions/index";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(name){
            dispatch(getCountriesName(name))
        }else{
            alert('Name not Found. Try again...')
        }
        setName('')   
    }

    return(
        <>
        <div >
            <input
               
                type='text'
                value={name}
                onChange={(e) => handleChange(e)}
                placeholder='Country´s Name...'
            />
            <button
                
                type='submit'
                onClick={(e) => handleSubmit(e)}>
                Search
            </button>      
        </div>
        </>
    )
}