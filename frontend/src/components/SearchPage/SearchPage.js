import React from 'react';
import './SearchPage.css';
import Choice from '../Choice/Choice.js';
import Slider from '../Slider/Slider.js';
import Canvas from '../Canvas/Canvas.js';

class SearchPage extends React.Component {
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
        fetch("http://localhost:8080/v1/individuals")
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

        fetch("http://localhost:8080/v1/imgResults/"+ e.target.value)
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
            <div class="search-page">
                <div class="ind-choice">
                    Seleziona un individuo: 
                    <Choice 
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
            </div>
        );
    }
}

export default SearchPage;