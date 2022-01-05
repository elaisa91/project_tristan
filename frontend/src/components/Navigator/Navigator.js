import React from 'react';
import {Link} from "react-router-dom";
import './Navigator.css';

class Navigator extends React.Component{
    render(){
        return(
            <div className='menu'>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/project">Progetto</Link>
                        </li>
                        <li>
                            <Link to="/facsimile">Facsimile</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navigator;