import React from 'react';
import './SubMenuItem.css';

class SubMenuItem extends React.Component{
    render(){
        return(
            <div className='sub-menu-item'>
                <img src={process.env.PUBLIC_URL + this.props.image} alt={this.props.desc} />
                <a href= "javascript:void(0);" onClick = {this.props.onClick}>{this.props.desc}</a>
            </div>
        );
    }
}

export default SubMenuItem;
