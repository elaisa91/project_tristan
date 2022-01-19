import React from 'react';
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import './CanvasPage.css';
import Canvas from '../Canvas/Canvas.js';
import Button from '../Button/Button.js';

class CanvasPage extends React.Component {
    constructor (props) { 
        super(props); 
        this.state = {
            selected_item: ""
        }
    }

    handleClick(icon){
        switch (icon){
            case "fa fa-file-o":
                <Navigate to = {"/facsimile/:"+this.props.image.id} />
                console.log("file");
                break;
            case "fa fa-bars":
                console.log("bars");
                <Navigate to = "/project" />
                break;
            default :
                console.log("close");
                <Navigate to = "/facsimile" />
            
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
                <Button 
                    icon = "fa fa-arrow-circle-left"
                    onClick = {(icon) => this.handleClick(icon)}
                /> 
                <Canvas
                    selected_image = {this.props.image}
                    height = {600}
                    width = {500}
                    onItemSelected = {(item, last_item) => this.handleItemSelected(item, last_item)}
                    onItemDeselected = {(last_item) => this.handleItemDeselected(last_item)}
                /> 
                <Button 
                    icon = "fa fa-arrow-circle-right"
                    onClick = {(icon) => this.handleClick(icon)}
                /> 
                <Button 
                    icon = "fa fa-file-o"
                    onClick = {(icon) => this.handleClick(icon)}
                /> 
                <Button 
                    icon = "fa fa-bars"
                    onClick = {(icon) => this.handleClick(icon)}
                />
                <Button 
                    icon = "fa fa-close"
                    onClick = {(icon) => this.handleClick(icon)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    image: state.image
});

export default connect(mapStateToProps)(CanvasPage);

