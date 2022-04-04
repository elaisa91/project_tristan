import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom"
import './CanvasPage.css';
import FacsDescriptionPage from '../FacsDescriptionPage/FacsDescriptionPage';
import Canvas from '../Canvas/Canvas.js';
import TextBox from '../TextBox/TextBox.js'


function CanvasPage(props) {
    const [error, setError] = useState(null);
    const [description, setDescription] = useState(false);
    let navigate = useNavigate();


    function handleClick(e, icon){
        switch (icon){
            case "get_current_page":
                setDescription(false);
                break;
            case "get_previous_page":
                var previous_num = parseInt(props.image.num)-1
                /*mettere in funzione a parte*/
                fetch("http://localhost:8080/v1/singleimage/"+previous_num.toString())
                .then(res => res.json())
                .then(
                    (result) => {
                        props.dispatch({
                            type: "SELECTED_IMAGE",
                            payload: result
                        });
                        navigate('/facsimile/:' + result.id);

                    },
                    (error) => {
                        setError(error);
                    }
                )   
                break; 
            case "get_next_page":
                var next_num = parseInt(props.image.num)+1
                fetch("http://localhost:8080/v1/singleimage/"+next_num.toString())
                .then(res => res.json())
                .then(
                    (result) => {
                       props.dispatch({
                            type: "SELECTED_IMAGE",
                            payload: result
                        }); 
                        navigate('/facsimile/:' + result.id);

                    },
                    (error) => {
                        setError(error);
                    }
                ) 
                break;
            case "get_description":
                setDescription(true);
                break;
            case "navigate_to_viscoll":
                window.open("https://vceditor.library.upenn.edu/project/621ce27ff0080b00016b95a7/viewOnly");
                break;
            case 'rotate_image_aclockwise':
                props.dispatch({
                    type: "ROTATE_ANGLE",
                    payload: props.rotate_angle-90
                });
                break;
            case 'rotate_image_clockwise':
                props.dispatch({
                    type: "ROTATE_ANGLE",
                    payload: props.rotate_angle+90
                });
                break;
            default :
                navigate('/facsimile');
            
        }
    }

    function handleItemDeselected(last_item_obj){
        last_item_obj = null;
        return last_item_obj;
    }

    function handleItemSelected(item_obj, last_item_obj){
        if((last_item_obj === null) || (Object.keys(last_item_obj)[0] !== Object.keys(item_obj)[0])) {
           last_item_obj = item_obj;
        }
        return last_item_obj;
    }

    return (
        <div className="canvas-page">
            <div className='controls-buttons'>
                <button className='button' onClick = {(e) => handleClick(e, "navigate_to_viscoll")}>
                    <img src = {process.env.PUBLIC_URL + '/viscoll-logo.png'} alt = 'Navigate to VisColl'/>
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
            {description === false 
            ?
                <div className='canvas-data'>
                    <div className='canvas-with-buttons'>
                    <div className='rotate-buttons'>
                            <button className='button' onClick = {(e) => handleClick(e, "rotate_image_aclockwise")}>
                                <i className="fa fa-undo"></i>
                            </button>
                            <button className='button' onClick = {(e) => handleClick(e, "rotate_image_clockwise")}>
                                <i className="fa fa-repeat"></i>
                            </button> 
                    </div>
                    <button className='direction-button' onClick = {(e) => handleClick(e, "get_previous_page")}>
                        <i className="fa fa-arrow-circle-left"></i>
                    </button>
                    <Canvas
                        height = {700}
                        width = {600}
                        onItemSelected = {(item, last_item) => handleItemSelected(item, last_item)}
                        onItemDeselected = {(last_item) => handleItemDeselected(last_item)}
                    />
                    <button className='direction-button' onClick = {(e) => handleClick(e, "get_next_page")}>
                        <i className="fa fa-arrow-circle-right"></i>
                    </button>
                    </div>
                   
                    <TextBox/>
                     
                </div>
            :
                <FacsDescriptionPage/>
            }
        </div>
    );
}

const mapStateToProps = state => ({ 
    image: state.image,
    rotate_angle: state.rotate_angle
});

export default connect(mapStateToProps)(CanvasPage);


