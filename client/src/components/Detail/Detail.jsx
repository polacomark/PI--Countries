import React, {useEffect} from "react";
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {countryDetail} from '../../actions/index';
import Navbar from "../NavBar/NavBar";
import './Detail.css'

export default function Detail(){
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(()=>{
        dispatch(countryDetail(id))
    },[id, dispatch]);

    const detail = useSelector((state)=>state.detail);

    return(
        <div>
            <Navbar/>
            <div className="detaails">
            <div className='contDt'>
            {
                detail?(
                    <div>
                        <div key={detail.id}></div>
                        <h2 className='art'>Name:{detail.name}  {detail.id}</h2>
                        <img src={detail.flags} alt="image_flag"></img>
                        <h4 className='art'>Continent: {detail.continents}</h4>
                        <h4 className='art'>Subregion: {detail.subregion}</h4>
                        <h4 className='art'>Capital: {detail.capital}</h4>
                        <h4 className='art'>Population: {detail.population}</h4>
                        <h4 className='art'>Area: {detail.area}km²</h4>
                        <h4 className='art'>Activities: </h4>
                        {
                            detail.activities && 
                            detail.activities?.map((a) => (
                                    <div key={a.id}>
                                <p>
                                <li>Name: {a.name}</li>
                                <li>Season: {a.season} </li>
                                <li>Duration:  {' '} {a.duration} </li>
                                <li>Difficulty: {a.difficulty} </li>
                                </p>
                                </div>
                            ))}
                        
                    </div>
                ):(<h1>...Loading</h1>)
            }
             <Link to='/home'>
                        <button>BACK</button>
                    </Link>
                    </div>
                    </div>
        </div>
    )

}
//export default Detail;