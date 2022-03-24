import React from 'react';
import './Header.css';

class Header extends React.Component{
    render(){
        return(
            <div className='header'>
                <div className='info'>
                    <p>A Scholarly Digital Edition</p>
                    <p>of Gottfried von Straßburg's Tristan</p>
                    <p>in München, Bayerischen Staatsbibliothek, Cgm 51</p>
                </div>
                <div className='img'>
                    <img src={process.env.PUBLIC_URL + '/university_logo.png'} alt="Università di Verona" />
                </div>
            </div>
        );
    }
}

export default Header;
