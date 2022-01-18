import React from 'react';
import { connect } from 'react-redux';
import './CanvasPage.css';
import Canvas from '../Canvas/Canvas.js';

class CanvasPage extends React.Component {
    constructor (props) { 
        super(props); 
        this.state = {
            selected_item: ""
        }
    }

    handleItemDeselected(last_item){
        last_item = null;
        this.setState({
            selected_item: ""
        }); 
        return last_item;
    }

    handleItemSelected(item, last_item){
        if(last_item !== item) {
           last_item = item;
            this.setState({
                selected_item: item
            }); 
        }
        return last_item;
    }

    render() {
        return (
            <div className="canvas-page">
                <Canvas
                    selected_image = {this.props.image}
                    height = {600}
                    width = {500}
                    onItemSelected = {(item, last_item) => this.handleItemSelected(item, last_item)}
                    onItemDeselected = {(last_item) => this.handleItemDeselected(last_item)}
                />  
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    image: state.image
});

export default connect(mapStateToProps)(CanvasPage);

