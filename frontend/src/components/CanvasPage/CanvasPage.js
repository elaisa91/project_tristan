import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import { connect } from 'react-redux';
import './CanvasPage.css';
import Canvas from '../Canvas/Canvas.js';
import Button from '../Button/Button.js';


function CanvasPage(props) {
    const [selected_item, setSelectedItem] = useState("");

    const selectedImage = props.image || {};
    // console.log(selectedImage);
    let navigate = useNavigate();

    function handleClick(icon){
        switch (icon){
            case "fa fa-file-o":
                navigate(`/facsimile/:${props.image.id}`);
                // <Navigate to = {"/facsimile/:"+props.image.id} />
                console.log("file");
                break;
            case "fa fa-bars":
                console.log("bars");
                navigate(`/project`);
                break;
            default :
                console.log("close");
                navigate(`/facsimile`);
            
        }
    }

    function handleItemDeselected(last_item){
        last_item = null;
        setSelectedItem("");
        return last_item;
    }

    function handleItemSelected(item, last_item){
        if(last_item !== item) {
           last_item = item;
           setSelectedItem(item);
        }
        return last_item;
    }

    return (
        <div className="canvas-page">
            <Button 
                icon = "fa fa-arrow-circle-left"
                onClick = {(icon) => handleClick(icon)}
            />
            <Canvas
                // selected_image = {selectedImage}
                height = {600}
                width = {500}
                onItemSelected = {(item, last_item) => handleItemSelected(item, last_item)}
                onItemDeselected = {(last_item) => handleItemDeselected(last_item)}
            /> 
            <Button 
                icon = "fa fa-arrow-circle-right"
                onClick = {(icon) => handleClick(icon)}
            /> 
            <Button 
                icon = "fa fa-file-o"
                onClick = {(icon) => handleClick(icon)}
            /> 
            <Button 
                icon = "fa fa-bars"
                onClick = {(icon) => handleClick(icon)}
            />
            <Button 
                icon = "fa fa-close"
                onClick = {(icon) => handleClick(icon)}
            />
        </div>
    );
}

const mapStateToProps = state => ({     
    image: state.image
});

export default connect(mapStateToProps)(CanvasPage);

