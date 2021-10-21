import React, { Component } from 'react';
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

    generatePolygon (string) {
        if (string === ""){
            return;
        }
        var points = string.split(" ");
        var poly  =  [];

        for (var coordinates of points){
            var xcoor = parseInt(coordinates.split(",")[0]) / this.propWidth;
            var ycoor = parseInt(coordinates.split(",")[1]) / this.propHeight;
                
            poly.push ([xcoor, ycoor]);
        }
        return poly;  
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

        if (is_out_array.length > 0){
            for (var i=0; i<is_out_array.length; i++){
                var item_obj = is_out_array[i];
                var item = Object.keys(item_obj)[0];
                var points = item_obj[item];
                
                //this.drawPoly(points, "black", "2");
            }
        }

        if (is_in_array.length === 1){
            item_obj = is_in_array[0];
            item = Object.keys(item_obj)[0];
            points = item_obj[item];
                
            this.drawPoly(points, "rgb(255,51,51)", "2"); 
            
            
            this.isNothingSelected = false;
            this.lastItemSelected = this.props.onItemSelected(item, this.lastItemSelected);
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
            if (subcategory !== '' && transcription !== ''){
                item = subcategory + " \n " + transcription;
            }else if (transcription !== ''){
                    item = transcription;
            } else if (subcategory !== ''){
                item = subcategory;   
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
    }  

    componentDidMount () {
        this.myRef.current.height = 600;
        this.myRef.current.width = 500;
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
            <canvas class = "canvas" ref={this.myRef} >
            </canvas>
        );
    }
}

class Selection extends React.Component{
    render (){
         return (
                <div class = "selection">
                    <p>{this.props.selected_item}</p>
                </div>
         );
    }
}

class FacImage extends React.Component{
    render(){
        return(
                <div class = "fac_img">
                    <img id = {this.props.id} src = {this.props.src} alt = {this.props.id} onClick = {this.props.onClick}/>
                    <p>{this.props.id}</p>
                </div>
        );
    }
}

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.selectedOptionString = null;
    }

    componentDidUpdate (){
        if(this.props.selected_option !== ""){
            this.selectedOptionString = this.props.selected_option + " è presente nelle seguenti carte: "
        }
    }

    renderFacImage(i){
        return (
            
            <FacImage
                src = {this.props.result_images[i].src}     
                id = {this.props.result_images[i].id}    
                onClick = {() => this.props.onClick(i)}
            />
        );
    }

    render() {
       
        const result_images = this.props.result_images;
        const img_list = [];
        for (var i = 0; i<result_images.length; i++){
           img_list.push(this.renderFacImage(i));
        }
        
        return (
            
            <div class = 'slider'>
                <p>{this.selectedOptionString}</p>
               
                {img_list}
              
            </div>
        );
    }
}

class Option extends React.Component{
    render(){
        return(
            <option id = {this.props.value}>
                {this.props.value}
            </option>
        );
    }
}

class Choise extends React.Component {

    render() {
        const options = this.props.options;
        const list = options.map((option) => <Option 
                                                value = {option}
                                            />);
        return (
            
            <select 
                name = 'persons'
                id="persons"
                value = {this.props.selected_option}
                onChange = {this.props.onChange}
            >
                {list}
                
            </select>
        );
    }
}

class App extends React.Component {
    constructor (props) { 
        super(props); 
        this.state = {
            error: null,
            isLoaded: false,
            options: [],
            selected_option: "",
            result_images : [],
            selected_image: {},
            selected_item: ""
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/imgTags")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        options: result,
                        selected_option: result[0]
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
          )

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

    handleClick(i){
        this.setState({
            selected_image: this.state.result_images[i]
        });   
    }
    
    handleChange(e){
        this.setState ({
            selected_option: e.target.value,
            selected_image: {}
        });

        fetch("http://localhost:8080/imgResults/"+ e.target.value)
            .then(res => res.json())
            .then(
                (result) => {
                    
                    this.setState({ 
                        
                        result_images: result
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )

       
    }

    render() {
        return (
            <div class="app">
                <div class="choise">
                    Seleziona un individuo: 
                    <Choise 
                        options = {this.state.options}
                        selected_option = {this.state.selected_option}
                        onChange = {(e) => this.handleChange(e)}
                    />
                </div>


                <Slider
                    selected_option = {this.state.selected_option}
                    result_images = {this.state.result_images}
                    onClick = {(i) => this.handleClick(i)}
                />
            
               <Canvas
                    selected_image = {this.state.selected_image}
                    onItemSelected = {(item, last_item) => this.handleItemSelected(item, last_item)}
                    onItemDeselected = {(last_item) => this.handleItemDeselected(last_item)}
               />
        
               {/*<Selection
                    selected_item = {this.state.selected_item}
               />*/}
            </div>
        );
    }
}

export default App;
 