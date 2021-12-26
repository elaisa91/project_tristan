import React from 'react';
import './Choice.css';
import Option from '../Option/Option.js';

class Choice extends React.Component {

    render() {
        const options = this.props.options;
        const list = options.map((option) => <Option 
                                                value = {option}
                                            />);
        return (
            <select 
                name = {this.props.name}
                id= {this.props.id}
                value = {this.props.selected_option}
                onChange = {this.props.onChange}
            >
                {list}
                
            </select>
        );
    }
}

export default Choice;