import React, { useEffect, useRef, useState }from 'react';
import { connect } from 'react-redux';
import './Canvas.css';
var area = require('area-polygon');
var is_point_in_poly = require("robust-point-in-polygon");

function Canvas(props) {
    let myRef = useRef(null);
    let propHeight = null;
    let propWidth = null;
    let lastItemSelected = null;
    let isNothingSelected = null;
    let isIn = null;
    let isOut = null;
    let selectedImage = props.image || {};

    const [mouseMove, setMouseMove] = useState(false);
    const [image, setImage] = useState(new Image());

    function clear (){
        const current = myRef.current;
        const ctx = current.getContext("2d");
        
        ctx.clearRect(0,0, current.width, current.height);
        image.src = "";
        image.id = "";
    }

    function generatePolygon (points) {
        if (points.length === 0){
            return;
        }
        var prop_points = points.map( ([xcoor, ycoor]) => 
                               [xcoor/propWidth, ycoor/propHeight]
        );  
        return prop_points;  
    }

    function drawTooltip(item, x, y, stroke, line_width, color, text_color, text_size){
        if (item === null){
            return;
        }
        const current = myRef.current;
        const ctx = current.getContext("2d");
        const tool_x = x-30;
        const tool_y = y+10; 
        
        var text_x = tool_x;
        var text_y = tool_y;
        var w_text = 0;
        var h_text = 0;
        var w_tool = 0;
        var h_tool = 0;

        /* fare in una funzione a parte (forse) */
        if (item.indexOf("\n") > -1){
            var item_array = item.split(" \n ");
            for (const line of item_array){
                var w_line = ctx.measureText(line).width;
                if (w_line > w_text){
                    w_text = w_line;
                }
                h_text += text_size;
            } 
        } else{
            w_text = ctx.measureText(item).width;
            h_text = text_size;
        }
        w_tool = w_text+10;
        h_tool = h_text+10;
        
        text_x += (w_tool-w_text)/2.0;
        text_y += (h_tool-h_text)/2.0;

        ctx.font = text_size+"px Junicode";
        ctx.strokeStyle = stroke;
        ctx.lineWidth = line_width;
        ctx.strokeRect(tool_x, tool_y, w_tool, h_tool);
        ctx.fillStyle = color;
        ctx.fillRect(tool_x, tool_y, w_tool, h_tool);
        ctx.textBaseline='top';

        if (typeof item_array !== 'undefined'){
            for (const line of item_array){
                ctx.fillStyle = text_color;
                ctx.fillText(line, text_x, text_y);
                text_y += text_size;
            }
        } else{
            ctx.fillStyle = text_color;
            ctx.fillText(item, text_x, text_y);
        }
    }

    function drawPoly(points, stroke, line_width){

        const current = myRef.current;
        const ctx = current.getContext("2d");

        var path = new Path2D();

        for (var i=0; i<points.length; i++){
            var xcoor = points[i][0];
            var ycoor = points[i][1];
            
            path.lineTo(xcoor,ycoor);
        }
        // disegna solo primo e ultimo punto
        /*for (var i=0; i<points.length; i++){
            var xcoor = points[i][0];
            var ycoor = points[i][1];
            if (i===0){
                ctx.fillStyle = "blue";
                ctx.lineWidth = 4;
                ctx.fillRect(xcoor, ycoor, 4, 4);
            } else if (i===points.length-1){
                ctx.fillStyle = "red";
                ctx.lineWidth = 4;
                ctx.fillRect(xcoor, ycoor, 4, 4);
            }
            
        }*/
        ctx.strokeStyle = stroke;
        ctx.lineWidth = line_width;
        ctx.stroke(path);
    }

    function drawCanvas(is_in_array, is_out_array) {
        
        const current = myRef.current;
        const ctx = current.getContext("2d");

        var nheight = Math.ceil(image.height / propHeight);
        var nwidth = Math.ceil(image.width / propWidth);

        ctx.clearRect(0,0, current.width, current.height);
        ctx.drawImage(image, 0, 0, nwidth, nheight);

        /*if (is_out_array.length > 0){
            for (var i=0; i<is_out_array.length; i++){
                var item_obj = is_out_array[i];
                var item = Object.keys(item_obj)[0];
                var points = item_obj[item];
                
                //drawPoly(points, "black", "2");
            }
        }*/

        if (is_in_array.length === 1){
            var item_obj = is_in_array[0];
            var item = Object.keys(item_obj)[0];
            var points = item_obj[item];
                
            drawPoly(points, "rgba(153,76,0,0.7)", "2"); 
            
            
            isNothingSelected = false;
            lastItemSelected = props.onItemSelected(item, lastItemSelected);

            if (is_out_array.length > 0){
                for (var i=0; i<is_out_array.length; i++){
                    item_obj = is_out_array[i];
                    item = Object.keys(item_obj)[0];
                    points = item_obj[item];
                    if (item === lastItemSelected){
                        drawPoly(points, "rgba(153,76,0,0.7)", "2");
                    }
                }
            }
        }
        
        /*if (is_in_array.length === 1){
            var item_obj = is_in_array[0];
            var item = Object.keys(item_obj)[0];
            var points = item_obj[item];
                
            drawPoly(points, "red", "4"); 
            
            isNothingSelected = false;
            lastItemSelected = props.onItemSelected(item, lastItemSelected);
        }

        if (is_out_array.length > 0){
            for (var i=0; i<is_out_array.length; i++){
                item_obj = is_out_array[i];
                item = Object.keys(item_obj)[0];
                points = item_obj[item];
                
                drawPoly(points, "black", "2");
            }
        }*/


        if (isNothingSelected){
            lastItemSelected = props.onItemDeselected(lastItemSelected);
        }
    }
    
    function isPointInPoly(sel_img, x, y){
        var polygons = sel_img.polygons;
        isIn = [];
        isOut = [];

        for (var el of polygons){
            //fare un metodo o funzione a parte per sta cosa 
            var item_obj = {};
            var item = "";
            var points = el['points'];
            var id = el['id'];
            var subcategory = el['subcategory'];
            var transcription = el['transcription'];
            if (Object.keys(subcategory).length !== 0 && transcription !== ''){
                item = subcategory['name'] + ": \n " + transcription['text'];
            } else if (transcription !== ''){
                item = transcription['text'];
            } else if (Object.keys(subcategory).length !== 0){
                item = subcategory['name'];   
            } else if (id !== ''){
                item = id;
            }
            
            var poly = generatePolygon(points);
            item_obj[item] = poly;

            if (is_point_in_poly(poly, [x, y]) === -1 || is_point_in_poly(poly, [x, y]) === 0) {
                isIn.push (item_obj); 
            } else {
                isOut.push (item_obj);
            }
        }
        
        // fare in una funzione a parte (forse usare sort)
        if (isIn.length > 1){
            var smallest_index = 0;
            var smallest = isIn[smallest_index];
            var item_smallest = Object.keys(smallest)[0];
            var points_smallest = smallest[item_smallest];
            var new_is_in = smallest;
            for (var i=1; i<isIn.length; i++){
                var item_obj = isIn[i];
                var item = Object.keys(item_obj)[0];
                var points = item_obj[item];
                if (area(points) < area(points_smallest) || area(points) === area(points_smallest)){
                    new_is_in = item_obj;
                    isOut.push(smallest);
                    smallest_index = i;
                    smallest = isIn[smallest_index];
                    item_smallest = Object.keys(smallest)[0];
                    points_smallest = smallest[item_smallest];
                } else{
                    isOut.push(item_obj);
                }
            }
            isIn = [new_is_in];
        }
        
        if (isOut.length > 1){
            isOut.sort((a, b) => {
                if (area(a[Object.keys(a)[0]]) > area(b[Object.keys(b)[0]])) { return -1;}
                if (area(a[Object.keys(a)[0]]) < area(b[Object.keys(b)[0]])) {return 1;}
                return 0;
            });
        }
    }

    useEffect(() => {
        if(mouseMove === false) {
            myRef.current.height = props.height;
            myRef.current.width = props.width;
    
            myRef.current.onmousemove = (e) => { 
                if (Object.keys(selectedImage).length === 0) { 
                    return;
                }
                isNothingSelected = true;
                var x = e.offsetX;
                var y = e.offsetY;
                isPointInPoly(selectedImage, x, y);
                drawCanvas(isIn, isOut);
                drawTooltip(lastItemSelected, x, y,'rgb(128,128,128)', "2", "rgba(0,0,0,0.6)", 'rgb(255,255,255)', 16);
            }
    
            myRef.current.onmouseout = () => {
                if (Object.keys(selectedImage).length === 0) { 
                    return;
                }
                isNothingSelected = true;
                isPointInPoly(selectedImage, -1, -1,);
                drawCanvas(isIn, isOut);
            }
            setMouseMove(true);
        }
        if (Object.keys(selectedImage).length > 0) { 
            if (selectedImage.src !== image.src) {
                image.src = selectedImage.src;
                image.id = selectedImage.id;

                image.onload = () => {
                    propHeight = Math.ceil(image.height/ myRef.current.height);
                    propWidth =  Math.ceil(image.width /myRef.current.width);
                    isPointInPoly(selectedImage, -1, -1);
                    drawCanvas(isIn, isOut);
                } 
           }
        } else {
            clear();
        }
    });
    return(
        <canvas className = "canvas" ref={myRef} >
        </canvas>
    );
    
}

const mapStateToProps = state => ({     
    image: state.image
});

export default connect(mapStateToProps)(Canvas);