import React from 'react';
import './Button.css';

class Button extends React.Component{
    render(){
        return(
            <button className = "button" onClick = {() => this.props.onClick(this.props.icon)}>
                <i className = {this.props.icon}></i>
            </button>
        );
    }
}

export default Button;