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
        options.includes(null)||options.length===1 ? this.showing = false : this.showing=true;
        const first_option = <Option 
                                selected = {true}
                                disabled = {true}
                                value = {options[0]}
                            />

        const list = options.slice(1).map((option) => <Option 
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
                //value = {this.props.selected_option}
                onChange = {this.props.onChange}
            >
                {first_option}
                {list}
                
            </select>
            :
            null
        );
    }
}

export default Choice;