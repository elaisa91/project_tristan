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
        options.includes(null)||options.length===0 ? this.showing = false : this.showing=true;
        const list = options.map((option) => <Option 
                                                value = {option}
                                            />);
        return (
            this.showing === true 
            ?
            <select 
                name = {this.props.name}
                id= {this.props.id}
                value = {this.props.selected_option}
                onChange = {this.props.onChange}
            >
                {list}
                
            </select>
            :
            null
        );
    }
}

export default Choice;