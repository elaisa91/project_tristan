import React from 'react';
import './Header.css';

class Header extends React.Component{
    render(){
        return(
            <div className='header'>
                <div className='info'>
                    <p>A DIGITAL SCHOLARLY EDITION</p>
                    <p>OF TRISTAN ROMANCE IN MÜNCHEN, BSB, CGM 51</p>
                    <p>THE ILLUSTRATED FOLIOS</p>
                </div>
                {/*<div className='img'>
                    <img src={process.env.PUBLIC_URL + '/university_logo.png'} alt="Università di Verona" />
                </div>*/}
            </div>
        );
    }
}

export default Header;
