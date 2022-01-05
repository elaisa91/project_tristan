import React from 'react';
import './Canvas.css';
var area = require('area-polygon');
var is_point_in_poly = require("robust-point-in-polygon");

class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.image = null;
        this.propHeight = null;
        this.propWidth = null;
        this.lastItemSelected = null;
        this.isNothingSelected = null;
        this.isIn = null;
        this.isOut = null;
    }

    clear (){
        const current = this.myRef.current;
        const ctx = current.getContext("2d");
        
        ctx.clearRect(0,0, current.width, current.height);
        this.image.src = "";
        this.image.id = "";
    }

    generatePolygon (points) {
        if (points.length === 0){
            return;
        }
        var prop_points = points.map( ([xcoor, ycoor]) => 
                               [xcoor/this.propWidth, ycoor/this.propHeight]
        );  
        return prop_points;  
    }

    drawTooltip(item, x, y, stroke, line_width, color, text_color, text_size){
        if (item === null){
            return;
        }
        const current = this.myRef.current;
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

    drawPoly(points, stroke, line_width){

        const current = this.myRef.current;
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

    drawCanvas(is_in_array, is_out_array) {
        
        const current = this.myRef.current;
        const ctx = current.getContext("2d");

        var nheight = Math.ceil(this.image.height / this.propHeight);
        var nwidth = Math.ceil(this.image.width / this.propWidth);

        ctx.clearRect(0,0, current.width, current.height);
        ctx.drawImage(this.image, 0, 0, nwidth, nheight);

        /*if (is_out_array.length > 0){
            for (var i=0; i<is_out_array.length; i++){
                var item_obj = is_out_array[i];
                var item = Object.keys(item_obj)[0];
                var points = item_obj[item];
                
                //this.drawPoly(points, "black", "2");
            }
        }*/

        if (is_in_array.length === 1){
            var item_obj = is_in_array[0];
            var item = Object.keys(item_obj)[0];
            var points = item_obj[item];
                
            this.drawPoly(points, "rgba(153,76,0,0.7)", "2"); 
            
            
            this.isNothingSelected = false;
            this.lastItemSelected = this.props.onItemSelected(item, this.lastItemSelected);

            if (is_out_array.length > 0){
                for (var i=0; i<is_out_array.length; i++){
                    item_obj = is_out_array[i];
                    item = Object.keys(item_obj)[0];
                    points = item_obj[item];
                    if (item === this.lastItemSelected){
                        this.drawPoly(points, "rgba(153,76,0,0.7)", "2");
                    }
                }
            }
        }
        
        /*if (is_in_array.length === 1){
            var item_obj = is_in_array[0];
            var item = Object.keys(item_obj)[0];
            var points = item_obj[item];
                
            this.drawPoly(points, "red", "4"); 
            
            this.isNothingSelected = false;
            this.lastItemSelected = this.props.onItemSelected(item, this.lastItemSelected);
        }

        if (is_out_array.length > 0){
            for (var i=0; i<is_out_array.length; i++){
                item_obj = is_out_array[i];
                item = Object.keys(item_obj)[0];
                points = item_obj[item];
                
                this.drawPoly(points, "black", "2");
            }
        }*/


        if (this.isNothingSelected){
            this.lastItemSelected = this.props.onItemDeselected(this.lastItemSelected);
        }
    }
    
    isPointInPoly(sel_img, x, y){
        var polygons = sel_img.polygons;
        this.isIn = [];
        this.isOut = [];

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
            
            var poly = this.generatePolygon(points);
            item_obj[item] = poly;

            if (is_point_in_poly(poly, [x, y]) === -1 || is_point_in_poly(poly, [x, y]) === 0) {
                this.isIn.push (item_obj); 
            } else {
                this.isOut.push (item_obj);
            }
        }
        
        // fare in una funzione a parte (forse usare sort)
        if (this.isIn.length > 1){
            var smallest_index = 0;
            var smallest = this.isIn[smallest_index];
            var item_smallest = Object.keys(smallest)[0];
            var points_smallest = smallest[item_smallest];
            var new_is_in = smallest;
            for (var i=1; i<this.isIn.length; i++){
                var item_obj = this.isIn[i];
                var item = Object.keys(item_obj)[0];
                var points = item_obj[item];
                if (area(points) < area(points_smallest) || area(points) === area(points_smallest)){
                    new_is_in = item_obj;
                    this.isOut.push(smallest);
                    smallest_index = i;
                    smallest = this.isIn[smallest_index];
                    item_smallest = Object.keys(smallest)[0];
                    points_smallest = smallest[item_smallest];
                } else{
                    this.isOut.push(item_obj);
                }
            }
            this.isIn = [new_is_in];
        }
        
        if (this.isOut.length > 1){
            this.isOut.sort((a, b) => {
                if (area(a[Object.keys(a)[0]]) > area(b[Object.keys(b)[0]])) { return -1;}
                if (area(a[Object.keys(a)[0]]) < area(b[Object.keys(b)[0]])) {return 1;}
                return 0;
            });
        }
    }  

    componentDidMount () {
        this.myRef.current.height = this.props.height;
        this.myRef.current.width = this.props.width;
        this.image = new Image();

        this.myRef.current.onmousemove = (e) => { 
            if (Object.keys(this.props.selected_image).length === 0) { 
                return;
            }
            this.isNothingSelected = true;
            var x = e.offsetX;
            var y = e.offsetY;
            this.isPointInPoly(this.props.selected_image, x, y);
            this.drawCanvas(this.isIn, this.isOut);
            this.drawTooltip(this.lastItemSelected, x, y,'rgb(128,128,128)', "2", "rgba(0,0,0,0.6)", 'rgb(255,255,255)', 16);
        }

        this.myRef.current.onmouseout = () => {
            if (Object.keys(this.props.selected_image).length === 0) { 
                return;
            }
            this.isNothingSelected = true;
            this.isPointInPoly(this.props.selected_image, -1, -1,);
            this.drawCanvas(this.isIn, this.isOut);
        }
    }
    
    componentDidUpdate() {
        if (Object.keys(this.props.selected_image).length > 0) { 
            if (this.props.selected_image.src !== this.image.src) {
                this.image.src = this.props.selected_image.src;
                this.image.id = this.props.selected_image.id;

                this.image.onload = () => {
                    this.propHeight = Math.ceil(this.image.height/ this.myRef.current.height);
                    this.propWidth =  Math.ceil(this.image.width /this.myRef.current.width);
                    this.isPointInPoly(this.props.selected_image, -1, -1);
                    this.drawCanvas(this.isIn, this.isOut);
                } 
           }
        } else {
            this.clear();
        }
    }

    render (){
        return(
            <canvas className = "canvas" ref={this.myRef} >
            </canvas>
        );
    }
}

export default Canvas;