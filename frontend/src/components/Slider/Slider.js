import React from 'react';
import { connect } from 'react-redux';
import './Slider.css';
import FacImage from '../FacImage/FacImage.js';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        
    }

    renderFacImage(i){
        return (
            
            <FacImage
                src = {this.props.result_images[i].src}     
                id = {this.props.result_images[i].id}    
                onClick = {() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const selectedOptionString = this.props.selected_option + " è presente nelle seguenti carte: "
        const result_images = this.props.result_images;
        const img_list = [];
        for (var i = 0; i<result_images.length; i++){
           img_list.push(this.renderFacImage(i));
        }
        
        return (
            this.props.selected_option !== ""
            ?
            <div className = 'slider'>
                <p>{this.selectedOptionString}</p>
               
                {img_list}
              
            </div>
            :
            null
        );
    }
}

const mapStateToProps = state => ({ 
    selected_option: state.selected_option,
    result_images: state.result_images
});

export default connect(mapStateToProps)(Slider);