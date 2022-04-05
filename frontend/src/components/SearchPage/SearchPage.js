import React from 'react';
import { connect } from 'react-redux';
import './SearchPage.css';
import Choice from '../Choice/Choice.js';
import Slider from '../Slider/Slider.js';
import { refreshResult } from '../../helper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


class SearchPage extends React.Component {
    constructor (props) { 
        super(props); 
        this.state = {
            error: null,
        };
    }

        
    async componentDidMount(){
        if(this.props.selected_catoption === ""){
            /* mettere queste chiamate in funzioni a parte e usare axios*/
            /*fetch("http://localhost:8080/v1/imgResults/null")
            
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
                )*/
                this.props.dispatch({
                    type: "RESULT_IMAGES",
                    payload: await refreshResult()
                });

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
        const top100Films = [
            { filmName: 'The Shawshank Redemption', year: 1994 },
            { filmName: 'The Godfather', year: 1972 },
            { filmName: 'The Godfather: Part II', year: 1974 },
            { filmName: 'The Dark Knight', year: 2008 },
            { filmName: '12 Angry Men', year: 1957 },
            { filmName: "Schindler's List", year: 1993 }]

        return (
            this.props.visible &&
            <div className="search-page">
                <div className='aside'>
                    <div className="cat-choice">
                        <Choice
                            name = 'categories' 
                            id = 'categories'
                            options = {this.props.cat_options}
                            placeholder = "Select a category"
                            description = "BY CATEGORY"
                            selected_option = {this.props.selected_catoption}
                            onChange = {(e) => this.handleCategoryChange(e)}
                        />
                    </div>
                    <Autocomplete  //Component Material UI, search bar. Modifica ciò che ti serve
                        disablePortal={false}
                        id="combo-box-demo"
                        options={top100Films} //l'oggetto da cui prendi la lista, puoi passare anche un array
                        sx={{ width: 300 }} // puoi passare regole css qui dentro
                        clearOnEscape={true}
                        isOptionEqualToValue={(option, value) => option.filmName === value.filmName} //cambia solo la chiave, se usi un array, butta via questa proprietà.
                        multiple={false} //se vuoi far selezionare più di un elemento
                        noOptionsText="NON CE N'è COVIDDI" //Testo che mostra quando non ci sono risultati
                        onChange={(_, value) => {if(value) this.setState({categoryFilter: value.filmName})}} //Metti il valore selezionato in uno stato che ti piace, anche redux se vuoi
                        getOptionLabel={(option) => option.filmName} //la chiave dell'oggetto da cui prendi la lista, se passi un array sopra, puoi togliere questa proprietà 
                        renderInput={(params) => <TextField {...params} label="Rofl?" />} //label: testo quando non c'è alcuna selezione. Al posto di TextField puoi mettere un'altro elemento se ti piace di più ma te lo sconsiglio.
                    />
                    <div className="subcat-choice">
                        <Choice 
                            name = 'subcategories' 
                            id = 'subcategories'
                            options = {this.props.subcat_options}
                            placeholder = "Select a subcategory"
                            description = "BY SUBCATEGORY"
                            selected_option = {this.props.selected_subcatoption}
                            onChange = {(e) => this.handleSubCategoryChange(e)}
                        />
                    </div>
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