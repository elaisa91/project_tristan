import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import './CanvasPage.css';
import Canvas from '../Canvas/Canvas.js';
import TextOne from '../Texts/TextOne.js';
import TextBox from '../TextBox/TextBox.js'


function CanvasPage(props) {
    const [selected_item, setSelectedItem] = useState("");
    const [description, setDescription] = useState(false);
    let navigate = useNavigate();


    function handleClick(e, icon){
        switch (icon){
            case "get_current_page":
            case "get_previous_page":
            case "get_next_page":
                setDescription(false);
                break;
            case "get_description":
                setDescription(true);
                break;
            default :
                navigate('/facsimile');
            
        }
    }

    function handleItemDeselected(last_item_obj){
        last_item_obj = null;
        setSelectedItem("");
        return last_item_obj;
    }

    function handleItemSelected(item_obj, last_item_obj){
        if((last_item_obj === null) || (Object.keys(last_item_obj)[0] !== Object.keys(item_obj)[0])) {
           last_item_obj = item_obj;
           setSelectedItem(Object.keys(item_obj)[0]);
        }
        return last_item_obj;
    }

    return (
        <div className="canvas-page">
            <button className='button' onClick = {(e) => handleClick(e, "get_previous_page")}>
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
            <TextBox/>
            <button className='button' onClick = {(e) => handleClick(e, "get_next_page")}>
                <i className="fa fa-arrow-circle-right"></i>
            </button>
            <button className='button' onClick = {(e) => handleClick(e, "get_current_page")}>
                <i className="fa fa-file-o"></i>
            </button>
            <button className='button' onClick = {(e) => handleClick(e, "get_description")}>
                <i className="fa fa-bars"></i>
            </button>
            <button className='button' onClick = {(e) => handleClick(e, "close_page")}>
                <i className="fa fa-close"></i>
            </button>
        </div>
    );
}


export default CanvasPage;

