import React from 'react';
import './Option.css';
class Option extends React.Component{
    render(){
        return(
            <option 
                id = {this.props.value} 
                selected = {this.props.selected} 
                disabled = {this.props.disabled}
            >  
            {this.props.value}
            </option>
        );
    }
}

export default Option;