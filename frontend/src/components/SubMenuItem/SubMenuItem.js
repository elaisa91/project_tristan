import React from 'react';
import './SubMenuItem.css';

class SubMenuItem extends React.Component{
    render(){
        return(
            <div className='sub-menu-item'>
                <img src={process.env.PUBLIC_URL + this.props.image} alt={this.props.desc} />
                <p>{this.props.desc}</p> {/*sostituire con <a></a>*/}
            </div>
        );
    }
}

export default SubMenuItem;
