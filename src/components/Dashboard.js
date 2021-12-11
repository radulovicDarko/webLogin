import React from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard({text, handleLogOut}) {
    return (
        <div className="app-content">
            <h1 className='dashboard-title'>{text}</h1>
            <p className="dashboard-content">Projekat iz predmeta Bezbednost i zastita racunarskih mreza</p>
            <p className='team team-title'>Projekat radili:</p>
            <ul className='team'>
                <li>
                    <p>Darko Radulovic 3/2018</p>
                </li>
                <li>
                    <p>Nikola Milakovic 76/2018</p>
                </li>
                <li>
                    <p>Zeljko Milovanovic 200/2018</p>
                </li>
            </ul>
            <NavLink onClick={handleLogOut} to='/dashboard' className='log-out-btn'><p>Log out</p></NavLink>
        </div>
    )
}
