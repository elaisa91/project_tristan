import React from 'react';
import './Option.css';
class Option extends React.Component{
    render(){
        return(
            <option id = {this.props.value}>
                {this.props.value}
            </option>
        );
    }
}

export default Option;