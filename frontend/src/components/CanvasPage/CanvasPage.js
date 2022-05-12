import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom"
import './CanvasPage.css';
import FacsDescriptionPage from '../FacsDescriptionPage/FacsDescriptionPage';
import Canvas from '../Canvas/Canvas.js';
import TextBox from '../TextBox/TextBox.js'


function CanvasPage(props) {
    const [error, setError] = useState(null);
    const [description, setDescription] = useState(false);
    const [multispec, setMultispec] = useState(false);
    const [showstr, setShowstr] = useState("Show");
    let navigate = useNavigate();

    async function handleClick(e, icon){
        switch (icon){
            case "get_current_page":
                setDescription(false);
                break;
            case "get_previous_page":
                var previous_num = parseInt(props.image.num)-1;
                if (previous_num < 0) break;
                /*mettere in funzione a parte*/
                var response = await fetch("http://localhost:8080/v1/singleimage/"+previous_num.toString());
                var result = await response.json();
                if(!result) setError(error);
                props.dispatch({
                    type: "SELECTED_IMAGE",
                    payload: result
                });
                props.dispatch({
                    type: "MULTISPEC_IMAGE",
                    payload: result["multispec_src"]
                });
                setMultispec(false);
                setShowstr("Show");
                navigate('/facsimile/:' + result.id);
                break;
            
            case "get_next_page":
                var next_num = parseInt(props.image.num)+1
                if (next_num >= props.result_images.length) break;
                var response = await fetch("http://localhost:8080/v1/singleimage/"+next_num.toString());
                var result = await response.json();
                if(!result) setError(error);
                props.dispatch({
                    type: "SELECTED_IMAGE",
                    payload: result
                }); 
                props.dispatch({
                    type: "MULTISPEC_IMAGE",
                    payload: result["multispec_src"]
                });
                setMultispec(false);
                setShowstr("Show");
                navigate('/facsimile/:' + result.id);
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
            case 'show_hidden_multispec_image':
                if (multispec === false){
                    setMultispec(true);
                    setShowstr("Hide");
                } else {
                    setMultispec(false);
                    setShowstr("Show");
                }
                break;
            default :
                navigate('/facsimile');
            
        }
    }

    function handleItemSelected(item_obj, last_item_obj){
        if((last_item_obj === null) || (Object.keys(last_item_obj)[0] !== Object.keys(item_obj)[0])) {
           last_item_obj = item_obj;
        }
        return last_item_obj;
    }

    return (
        <div className="canvas-page">
            <div className='show-button'>
                <button className = "button" onClick = {(e) => handleClick(e, "show_hidden_multispec_image")}>
                    <p>{`${showstr} multispectral image`}</p>
                </button>
            </div>
            {<div className='controls-buttons'>
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
            </div>}
            {description === false &&
                <div className='canvas-data'>
                    <div className='multispectral-image' height={props.n_height} width={props.n_width}>
                    {multispec && <img src = {props.multispec_image} alt = "corresponding multispectral image" 
                    height={props.n_height} width={props.n_width} />}
                    </div>
                    <div className='canvas-with-buttons'>
                        <button className='direction-button' onClick = {(e) => handleClick(e, "get_previous_page")}>
                            <i className="fa fa-arrow-circle-left"></i>
                        </button>
                        <Canvas
                            height = {700}
                            width = {600}
                            onItemSelected = {(item, last_item) => handleItemSelected(item, last_item)}
                        />
                        <button className='direction-button' onClick = {(e) => handleClick(e, "get_next_page")}>
                            <i className="fa fa-arrow-circle-right"></i>
                        </button>
                    </div>
                    <div className='rotate-buttons'>
                        <button className='button' onClick = {(e) => handleClick(e, "rotate_image_clockwise")}>
                            <i className="fa fa-repeat"></i>
                        </button>
                        <button className='button' onClick = {(e) => handleClick(e, "rotate_image_aclockwise")}>
                            <i className="fa fa-undo"></i>
                        </button> 
                    </div>
                
                    <TextBox/>
                </div>
            }
            {description && <FacsDescriptionPage/>}
        </div>
    );
}

const mapStateToProps = state => ({ 
    image: state.image,
    rotate_angle: state.rotate_angle,
    result_images: state.result_images,
    multispec_image: state.multispec_image,
    n_height : state.n_height,
    n_width : state.n_width
});

export default connect(mapStateToProps)(CanvasPage);


