import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import './CanvasPage.css';
import Canvas from '../Canvas/Canvas.js';
import TextOne from '../Texts/TextOne';


function CanvasPage(props) {
    const [selected_item, setSelectedItem] = useState("");
    const [description, setDescription] = useState(false);
    let navigate = useNavigate();
    let myRef = useRef(null);


    function handleClick(e, icon){
        switch (icon){
            case "fa fa-file-o":
            case "fa fa-arrow-circle-left":
            case "fa fa-arrow-circle-right":
                setDescription(false);
                break;
            case "fa fa-bars":
                setDescription(true);
                break;
            default :
                navigate('/facsimile');
            
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
            <button className='button' ref = {myRef} onClick = {(e) => handleClick(e, "fa fa-arrow-circle-left")}>
                <i className="fa fa-arrow-circle-left"></i>
            </button>
            {description === false 
            ?
                <Canvas
                    height = {600}
                    width = {500}
                    onItemSelected = {(item, last_item) => handleItemSelected(item, last_item)}
                    onItemDeselected = {(last_item) => handleItemDeselected(last_item)}
                />
            :
                <TextOne/>
            }
            <button className='button' onClick = {(e) => handleClick(e, "fa fa-arrow-circle-right")}>
                <i className="fa fa-arrow-circle-right"></i>
            </button>
            <button className='button' onClick = {(e) => handleClick(e, "fa fa-file-o")}>
                <i className="fa fa-file-o"></i>
            </button>
            <button className='button' onClick = {(e) => handleClick(e, "fa fa-bars")}>
                <i className="fa fa-bars"></i>
            </button>
            <button className='button' onClick = {(e) => handleClick(e, "fa fa-close")}>
                <i className="fa fa-close"></i>
            </button>
        </div>
    );
}


export default CanvasPage;

