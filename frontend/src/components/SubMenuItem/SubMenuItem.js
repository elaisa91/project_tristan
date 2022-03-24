import React from 'react';
import './SubMenuItem.css';

class SubMenuItem extends React.Component{
    render(){
        return(
            <div className='sub-menu-item'>
                <button className='button' onClick = {this.props.onClick}>
                    <p>{this.props.desc}</p>
                </button>
            </div>
        );
    }
}

export default SubMenuItem;
