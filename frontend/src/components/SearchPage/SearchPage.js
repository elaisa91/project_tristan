import React from 'react';
import { connect } from 'react-redux';
import './SearchPage.css';
import Choice from '../Choice/Choice.js';
import Slider from '../Slider/Slider.js';
import { filter_images, filter_subcategories, all_categories, all_folios_name } from '../../helper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {createFilterOptions} from '@mui/material/Autocomplete';


class SearchPage extends React.Component {
    constructor (props) { 
        super(props); 
        this.state = {
            error: null
        };
    }

        
    async componentDidMount(){
        this.props.dispatch({
            type: "ALL_SUBCATEGORIES",
            payload: await filter_subcategories(null)
        });
        this.props.dispatch({
            type: "ALL_FOLIOS",
            payload: await all_folios_name()
        });
        if(this.props.selected_catoption === ""){
                this.props.dispatch({
                    type: "RESULT_IMAGES",
                    payload: await filter_images(null)
                });

        }
        
        this.props.dispatch({
            type: "CAT_OPTIONS",
            payload: await all_categories()
            });    
    }

    handleClick(i){
        this.props.dispatch({
            type: "SELECTED_IMAGE",
            payload: this.props.result_images[i]
        });  
        this.props.dispatch({
            type: "MULTISPEC_IMAGE",
            payload: this.props.result_images[i]["multispec_src"]
        });  
        
    }
    
    async handleCategoryChange(e){
        this.props.dispatch({
            type: "SELECTED_CATOPTION",
            payload: e.target.value
        }); 
        this.props.dispatch({
            type: "SELECTED_SUBCATOPTION",
            payload: ""
        }); 
        this.props.dispatch({
            type: "SELECTED_SEARCH_FIELD",
            payload: ""
        }); 
        this.props.dispatch({
            type: "SELECTED_IMAGE",
            payload: {}
        });
        this.props.dispatch({
            type: "SUBCAT_OPTIONS",
            payload: []
        });
        this.props.dispatch({
            type: "SUBCAT_OPTIONS",
            payload: await filter_subcategories(e.target.value)
        }); 
        this.props.dispatch({
            type: "RESULT_IMAGES",
            payload: await filter_images(e.target.value)
        });
    }

    async handleSubCategoryChange(e){
        this.props.dispatch({
            type: "SELECTED_SUBCATOPTION",
            payload: e.target.value
        }); 
        this.props.dispatch({
            type: "RESULT_IMAGES",
            payload: await filter_images(e.target.value)
        });
        this.props.dispatch({
            type: "SELECTED_IMAGE",
            payload: {}
        });  
        this.props.dispatch({
            type: "SELECTED_SEARCH_FIELD",
            payload: ""
        });  
    }

    async handleAutocompleteChange(_, value){
        if(value) {
            this.props.dispatch({
                type: "SELECTED_SEARCH_FIELD", 
                payload: value
            });
            this.props.dispatch({
                type: "RESULT_IMAGES", 
                payload: await filter_images(value)
            });  
        }
    }

    render() {
        
        const all_search_fields = this.props.cat_options.concat(this.props.all_subcategories, this.props.all_folios);
        const filter_options = createFilterOptions({limit: 2});

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

                <div className='main-content'>
                    {/* per qualsiasi cosa guarda qui --> https://mui.com/api/autocomplete/ */}
                    <div className='autocomplete'>
                        <Autocomplete  //Component Material UI, search bar. Modifica ciò che ti serve
                            value={this.props.selected_search_field}
                            disablePortal={false}
                            id="autocomplete-ui"
                            options={all_search_fields} //l'oggetto da cui prendi la lista, puoi passare anche un array
                            filterOptions = {filter_options}
                            sx={{ width: '25vw'}} // puoi passare regole css qui dentro
                            clearOnEscape={true}
                            //isOptionEqualToValue={(option, value) => option.filmName === value.filmName} //cambia solo la chiave, se usi un array, butta via questa proprietà.
                            multiple={false} //se vuoi far selezionare più di un elemento
                            noOptionsText="No results" //Testo che mostra quando non ci sono risultati
                            onChange={(_,value) => this.handleAutocompleteChange(_,value)} //Metti il valore selezionato in uno stato che ti piace, anche redux se vuoi
                            //getOptionLabel={(option) => option.filmName} //la chiave dell'oggetto da cui prendi la lista, se passi un array sopra, puoi togliere questa proprietà 
                            renderInput={(params) => <TextField {...params} label="Search here" />} //label: testo quando non c'è alcuna selezione. Al posto di TextField puoi mettere un'altro elemento se ti piace di più ma te lo sconsiglio.
                        />
                    </div>
                    
                    <Slider
                        onClick = {(i) => this.handleClick(i)}
                    />
                     
                </div>   
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    cat_options: state.cat_options,
    all_subcategories: state.all_subcategories,
    all_folios: state.all_folios,
    subcat_options: state.subcat_options,
    selected_catoption: state.selected_catoption,
    selected_subcatoption: state.selected_subcatoption,
    selected_search_field: state.selected_search_field,
    selected_image: state.image,
    multispec_image: state.multispec_image,
    result_images: state.result_images,
    to_reset: state.to_reset
});

export default connect(mapStateToProps)(SearchPage);