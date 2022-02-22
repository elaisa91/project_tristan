import React from 'react';
import './Choice.css';
import Option from '../Option/Option.js';

class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.showing = null;
    }
    render() {
        const options = this.props.options;
        options.length>0 ? this.showing = true : this.showing = false;
        const placeholder_option = <Option 
                                selected = {true}
                                disabled = {true}
                                value = {this.props.placeholder}
                            />

        const list = options.map((option) => <Option 
                                                selected = {false}
                                                disabled = {false}
                                                value = {option}
                                            />);
       
        return (
            this.showing === true 
            ?
            <select 
                name = {this.props.name}
                id= {this.props.id}
                onChange = {this.props.onChange}

            >
                {placeholder_option}
                {list}
                
            </select>
            :
            null
        );
    }
}

export default Choice;