import React from 'react';
import {Link} from "react-router-dom";
import './FacImage.css';

class FacImage extends React.Component{
    render(){
        return(
                <div className = "fac-img">
                    <Link to= {"/facsimile/:"+this.props.id}>
                        <img id = {this.props.id} src = {this.props.src} alt = {this.props.id} onClick = {this.props.onClick}/>
                    </Link>
                    <p>{this.props.id}</p>
                </div>
        );
    }
}

export default FacImage;