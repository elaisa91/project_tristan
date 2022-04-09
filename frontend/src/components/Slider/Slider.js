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
        var selectedOptionString = "";
        if (this.props.selected_search_field != ""){
            selectedOptionString = this.props.selected_search_field + " can be found in the following folios: "
            for (const image of this.props.result_images){
                if(this.props.selected_search_field === image['id']){
                    selectedOptionString = this.props.selected_search_field + " found: "
                    break;
                }
            }
        }
        else if (this.props.selected_subcatoption != ""){
            selectedOptionString = this.props.selected_subcatoption + " can be found in the following folios: "
        }
        else if (this.props.selected_catoption != "") {
            selectedOptionString = this.props.selected_catoption + " can be found in the following folios: "
        }
        
        const result_images = this.props.result_images;
        const img_list = [];
        for (var i = 0; i<result_images.length; i++){
           img_list.push(this.renderFacImage(i));
        }
        
        return (
           
            <div className = 'slider'>
                <p>{selectedOptionString}
                </p>

                <div className='slider-images'>
                    {img_list}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    selected_catoption: state.selected_catoption,
    selected_subcatoption: state.selected_subcatoption,
    selected_search_field: state.selected_search_field,
    result_images: state.result_images
});

export default connect(mapStateToProps)(Slider);