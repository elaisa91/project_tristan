import React from 'react';
import { connect } from 'react-redux';
import './FacsimilePage.css';
import SubMenu from '../SubMenu/SubMenu.js';
import TextEight from '../Texts/TextEight';
import SearchPage from '../SearchPage/SearchPage';
import { refreshResult } from '../../helper';

class FacsimilePage extends React.Component{
    constructor (props) { 
        super(props); 
        this.state = {
            sub_menu_items: [{desc: "Search criteria", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Search in the database", image: process.env.PUBLIC_URL + '/university_logo.png'}]
        };
    }
    async handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Search criteria":
                /* raggruppare tutti quelli con visible */
                this.props.dispatch({
                    type: 'CRITERIA_VISIBLE',
                    payload: true
                });
                this.props.dispatch({
                    type: 'SEARCH_PAGE_VISIBLE',
                    payload: false
                });
                break;
            case "Search in the database": 
                this.props.dispatch({
                    type: 'CRITERIA_VISIBLE',
                    payload: false
                });
                this.props.dispatch({
                    type: 'SEARCH_PAGE_VISIBLE',
                    payload: true
                });
                this.props.dispatch({
                    type: "SUBCAT_OPTIONS",
                    payload: []
                });  
                this.props.dispatch({
                    type: "SELECTED_CATOPTION",
                    payload: ""
                });
                this.props.dispatch({
                    type: "SELECTED_SUBCATOPTION",
                    payload: ""
                });  
                this.props.dispatch({
                    type: "RESULT_IMAGES",
                    payload: await refreshResult()
                });
                this.props.dispatch({
                    type: "SELECTED_IMAGE",
                    payload: {}
                });
                break;
        }
    }
    render(){
        return(
            <div className='facsimile-page'>
                <div className='content'>
                    <SearchPage visible = {this.props.search_page_visible} />
                    <TextEight visible = {this.props.criteria_visible}/>
                </div>
                <SubMenu
                    sub_menu_items = {this.state.sub_menu_items}
                    onClick = {(i) => this.handleClick(i)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    subcat_options: state.subcat_options,
    selected_catoption: state.selected_catoption,
    selected_subcatoption: state.selected_subcatoption,
    selected_image: state.image,
    result_images: state.result_images,
    search_page_visible: state.search_page_visible,
    criteria_visible: state.criteria_visible
})

export default connect(mapStateToProps)(FacsimilePage);
