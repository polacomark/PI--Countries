import React from "react";
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <div>
            <Link to='/home'>
                <button>
                    <div>
                        <h1>¡¡WELCOME!!</h1>
                        <h2>PI COUNTRIES HENRY</h2>
                        <p>click to start!!</p>
                    </div>
                </button>
            </Link>
        </div>
    )
}