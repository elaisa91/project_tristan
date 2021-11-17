import React from 'react';
import './Slider.css';
import FacImage from '../FacImage/FacImage.js';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.selectedOptionString = null;
    }

    componentDidUpdate (){
        if(this.props.selected_option !== ""){
            this.selectedOptionString = this.props.selected_option + " è presente nelle seguenti carte: "
        }
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
       
        const result_images = this.props.result_images;
        const img_list = [];
        for (var i = 0; i<result_images.length; i++){
           img_list.push(this.renderFacImage(i));
        }
        
        return (
            
            <div class = 'slider'>
                <p>{this.selectedOptionString}</p>
               
                {img_list}
              
            </div>
        );
    }
}

export default Slider;