import React from 'react';
import { connect } from 'react-redux';
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

        var list = [];
        options.forEach((option) => { 
            if (option===this.props.selected_option){
                list.push(  
                            <Option 
                                selected = {true}
                                disabled = {false}
                                value = {option}
                            />)
            }
            else{
                list.push(  
                    <Option 
                        selected = {false}
                        disabled = {false}
                        value = {option}
                    />)
            }
        });
        
      
       
        return (
            this.showing === true 
            ?
            <div>
                <p>{this.props.description}</p>
                <select 
                    name = {this.props.name}
                    id= {this.props.id}
                    onChange = {this.props.onChange}

                >
                    {placeholder_option}
                    {list}
                    
                </select>
            </div>
            :
            null
        );
    }
}

const mapStateToProps = state => ({ 
    selected_catoption: state.selected_catoption,
    selected_subcatoption: state.selected_subcatoption
});

export default connect(mapStateToProps)(Choice);