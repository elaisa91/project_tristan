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
                            <Link to="/project">Project</Link>
                        </li>
                        <li>
                            <Link to="/facsimile">Query the database</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navigator;