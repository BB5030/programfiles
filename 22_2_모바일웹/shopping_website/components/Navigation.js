import React from "react";
import {Link} from "react-router-dom"
import './Navigation.css';

function Navigation(){
    return(
        <div className="nav">
    <Link to="/">Men's Wear</Link>
            <Link to="/kneat">Kneat</Link>
            <Link to="/lightOuter">Light Outer</Link>
            <Link to="/slacks">Slacks</Link>
        </div>
    )
}

export default Navigation;
