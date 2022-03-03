import React from "react";
import {Link} from 'react-router-dom';
import './NavBar.css'
//mport logo from '../../image/'


export default function Navbar(){
    return (
        <div className="nav">
            <div >
                <img/>
            </div>
            <div className="title">
                <h1>PI-COUNTRIES</h1>
            </div>
            <div>
                <ul>
                    <Link to='/'><button className="bth">LANDING</button></Link>
                    <Link to='/home'><button className="bth">HOME</button></Link>
                    <Link to='/activity'><button className="btc">CREATE ACTIVITY</button></Link>
                </ul>
            </div>
        </div>
    )
}