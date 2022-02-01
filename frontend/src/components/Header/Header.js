import React from 'react';
import './Header.css';

class Header extends React.Component{
    render(){
        return(
            <div className='header'>
                <div className='info'>
                    <p>Tristano</p>
                    <p>Gottfried von Strassburg</p>
                    <p>EDIZIONE DIGITALE</p>
                </div>
                <div className='img'>
                    <img src={process.env.PUBLIC_URL + '/university_logo.png'} alt="Università di Verona" />
                </div>
            </div>
        );
    }
}

export default Header;
