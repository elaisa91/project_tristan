import React from 'react';
import { Navigate } from "react-router-dom";
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
                <button className = "button" onClick = {() => this.handleClick("fa fa-arrow-circle-left")}>
                    <i className = "fa fa-arrow-circle-left"></i>
                </button>
                <Canvas
                    selected_image = {this.props.image}
                    height = {600}
                    width = {500}
                    onItemSelected = {(item, last_item) => this.handleItemSelected(item, last_item)}
                    onItemDeselected = {(last_item) => this.handleItemDeselected(last_item)}
                /> 
                <button className = "button" onClick = {() => this.handleClick("fa fa-arrow-circle-right")}>
                    <i className = "fa fa-arrow-circle-right"></i>
                </button> 
                <button className = "button" onClick = {() => this.handleClick("fa fa-file-o")}>
                    <i className = "fa fa-file-o"></i>
                </button> 
                <button className = "button" onClick = {() => this.handleClick("fa fa-bars")}>
                    <i className = "fa fa-bars"></i>
                </button> 
                <button className = "button" onClick = {() => this.handleClick("fa fa-close")}>
                    <i className = "fa fa-close"></i>
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    image: state.image
});

export default connect(mapStateToProps)(CanvasPage);

