import React from 'react';
import { connect } from 'react-redux';
import './SearchPage.css';
import Choice from '../Choice/Choice.js';
import Slider from '../Slider/Slider.js';

class SearchPage extends React.Component {
    constructor (props) { 
        super(props); 
        this.state = {
            error: null,
        };
    }
        
    componentDidMount(){
        if(this.props.selected_catoption === ""){
            /* mettere queste chiamate in funzioni a parte e usare axios*/
            fetch("http://localhost:8080/v1/imgResults/null")
            
                .then(res => res.json())
                .then(
                    (result) => {
                        this.props.dispatch({
                            type: "RESULT_IMAGES",
                            payload: result
                        });
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
        }
        /* mettere queste chiamate in funzioni a parte e usare axios*/
        fetch("http://localhost:8080/v1/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.dispatch({
                        type: "CAT_OPTIONS",
                        payload: result
                    });  
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )

        
    }

    handleClick(i){
        this.props.dispatch({
            type: "SELECTED_IMAGE",
            payload: this.props.result_images[i]
        });  
    }
    
    handleCategoryChange(e){
        this.props.dispatch({
            type: "SELECTED_CATOPTION",
            payload: e.target.value
        }); 
        this.props.dispatch({
            type: "SELECTED_SUBCATOPTION",
            payload: ""
        }); 
        this.props.dispatch({
            type: "SELECTED_IMAGE",
            payload: {}
        });
        this.props.dispatch({
            type: "SUBCAT_OPTIONS",
            payload: []
        })
        
         /* mettere queste chiamate in funzioni a parte e usare axios*/ 
        fetch("http://localhost:8080/v1/subcategories/"+ e.target.value)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.dispatch({
                        type: "SUBCAT_OPTIONS",
                        payload: result
                    }); 
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
        /* mettere queste chiamate in funzioni a parte e usare axios*/
        fetch("http://localhost:8080/v1/imgResults/"+ e.target.value)
        .then(res => res.json())
        .then(
            (result) => {
                this.props.dispatch({
                    type: "RESULT_IMAGES",
                    payload: result
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
        this.props.dispatch({
            type: "SELECTED_SUBCATOPTION",
            payload: e.target.value
        }); 
        this.props.dispatch({
            type: "SELECTED_IMAGE",
            payload: {}
        });
         /* mettere queste chiamate in funzioni a parte e usare axios*/
        fetch("http://localhost:8080/v1/imgResults/"+ e.target.value)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.dispatch({
                        type: "RESULT_IMAGES",
                        payload: result
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

            <div className="search-page">
                <div className="cat-choice">
                    <Choice
                        name = 'categories' 
                        id = 'categories'
                        options = {this.props.cat_options}
                        placeholder = "Seleziona una categoria"
                        selected_option = {this.props.selected_catoption}
                        onChange = {(e) => this.handleCategoryChange(e)}
                    />
                </div>

                <div className="subcat-choice">
                    <Choice 
                        name = 'subcategories' 
                        id = 'subcategories'
                        options = {this.props.subcat_options}
                        placeholder = "Seleziona una sottocategoria"
                        selected_option = {this.props.selected_subcatoption}
                        onChange = {(e) => this.handleSubCategoryChange(e)}
                    />
                </div>

                <Slider
                    onClick = {(i) => this.handleClick(i)}
                />
                
                
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    cat_options: state.cat_options,
    subcat_options: state.subcat_options,
    selected_catoption: state.selected_catoption,
    selected_subcatoption: state.selected_subcatoption,
    selected_image: state.image,
    result_images: state.result_images,
    to_reset: state.to_reset
});

export default connect(mapStateToProps)(SearchPage);