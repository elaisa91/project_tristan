import React from 'react';
import './FacImage.css';

class FacImage extends React.Component{
    render(){
        return(
                <div className = "fac-img">
                    <img id = {this.props.id} src = {this.props.src} alt = {this.props.id} onClick = {this.props.onClick}/>
                    <p>{this.props.id}</p>
                </div>
        );
    }
}

export default FacImage;