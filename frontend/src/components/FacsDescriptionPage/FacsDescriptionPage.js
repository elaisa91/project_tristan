import React from 'react';
import './FacsDescriptionPage.css';
import TextFive from '../Texts/TextFive';

class FacsDescriptionPage extends React.Component{
    constructor (props) { 
        super(props); 
    }
    render(){
        return(
            <div className='description-page'>
                <div className='content'>
                    <TextFive/>
                </div>
                <div className='aside'>
                </div>
            </div>
        );
    }
}

export default FacsDescriptionPage;