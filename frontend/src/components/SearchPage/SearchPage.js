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
            cat_options: ["Seleziona una categoria"],
            subcat_options: ["Seleziona una sottocategoria"],
            selected_option : "",
            result_images : [],
            selected_image: {},
            selected_item: ""
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/v1/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        cat_options: this.state.cat_options.concat(result),
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
    
    handleCategoryChange(e){
        this.setState ({
            selected_option: e.target.value,
            selected_image: {},
            subcat_options: ["Seleziona una sottocategoria"]
        });

        fetch("http://localhost:8080/v1/subcategories/"+ e.target.value)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({  
                        subcat_options: this.state.subcat_options.concat(result)
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
            /* mettere queste chiamate in funzioni a parte*/
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

    handleSubCategoryChange(e){
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
                <div class="cat-choice">
                    <Choice
                        name = 'categories' 
                        id = 'categories'
                        options = {this.state.cat_options}
                        onChange = {(e) => this.handleCategoryChange(e)}
                    />
                </div>

                <div class="subcat-choice">
                    <Choice 
                        name = 'subcategories' 
                        id = 'subcategories'
                        options = {this.state.subcat_options}
                        onChange = {(e) => this.handleSubCategoryChange(e)}
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