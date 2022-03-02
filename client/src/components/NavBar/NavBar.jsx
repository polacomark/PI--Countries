import React from "react";
import {Link} from 'react-router-dom';


export default function Navbar(){
    return (
        <div>
            <div>
                <img/>
            </div>
            <div>
                <h1>PI-COUNTRIES</h1>
            </div>
            <div>
                <ul>
                    <Link to='/'><button>LANDING</button></Link>
                    <Link to='/home'><button>HOME</button></Link>
                    <Link to='/activity'><button>CREATE ACTIVITY</button></Link>
                </ul>
            </div>
        </div>
    )
}