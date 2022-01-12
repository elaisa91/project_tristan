import React from 'react';
import './Text.css';

class Text extends React.Component{
    render(){
        return(
            <div className='text'>
               {this.props.content}
            </div>
        );
    }
}

export default Text;