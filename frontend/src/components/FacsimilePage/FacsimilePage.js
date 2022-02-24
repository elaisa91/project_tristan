import React from 'react';
import { connect } from 'react-redux';
import './FacsimilePage.css';
import Navigator from '../Navigator/Navigator.js';
import SubMenu from '../SubMenu/SubMenu.js';
import TextEight from '../Texts/TextEight';
import SearchPage from '../SearchPage/SearchPage';
import { refreshResult } from '../../helper';

class FacsimilePage extends React.Component{
    constructor (props) { 
        super(props); 
        this.state = {
            sub_menu_items: [{desc: "Descrizione del facsimile", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Illustrazioni", image: process.env.PUBLIC_URL + '/university_logo.png'}]
        };
    }
    async handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Descrizione del facsimile":
                /*this.props.dispatch({
                    type: "CONTENT",
                    payload: <TextEight/>
                });*/ 
                /* raggruppare tutti quelli con visible */
                this.props.dispatch({
                    type: 'DESCRIPTION_VISIBLE',
                    payload: true
                });
                this.props.dispatch({
                    type: 'SEARCH_PAGE_VISIBLE',
                    payload: false
                });
                break;
            case "Illustrazioni": 
                this.props.dispatch({
                    type: 'DESCRIPTION_VISIBLE',
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
                /*this.props.dispatch({
                    type: "RESULT_IMAGES",
                    payload: []
                }); */
                this.props.dispatch({
                    type: "SELECTED_IMAGE",
                    payload: {}
                });
                
                /*this.props.dispatch({
                    type: "CONTENT",
                    payload: <SearchPage/>
                }); */
                break;
            default: 
                this.props.dispatch({
                    type: "CONTENT",
                    payload: ""
                }); 
        }
    }
    render(){
        return(
            <div className='facsimile-page'>
                <Navigator/>
                <SubMenu
                    sub_menu_items = {this.state.sub_menu_items}
                    onClick = {(i) => this.handleClick(i)}
                />
                <div className='content'>
                    <SearchPage visible = {this.props.search_page_visible} />
                    <TextEight visible = {this.props.description_visible}/>
                </div>
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
    search_page_visible: state.search_page_visible,
    description_visible: state.description_visible
})

export default connect(mapStateToProps)(FacsimilePage);
