import React from 'react';
import { connect } from 'react-redux';
import './FacsimilePage.css';
import Navigator from '../Navigator/Navigator.js';
import SubMenu from '../SubMenu/SubMenu.js';
import TextEight from '../Texts/TextEight';
import SearchPage from '../SearchPage/SearchPage';

class FacsimilePage extends React.Component{
    constructor (props) { 
        super(props); 
        this.state = {
            sub_menu_items: [{desc: "Descrizione del facsimile", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Illustrazioni", image: process.env.PUBLIC_URL + '/university_logo.png'}],
            content : ""
        };
    }
    handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Descrizione del facsimile":
                this.setState(
                    {content: <TextEight/>}
                );
                break;
            case "Illustrazioni":
                this.props.dispatch({
                    type: "CAT_OPTIONS",
                    payload: this.props.cat_options
                });  
                this.props.dispatch({
                    type: "SUBCAT_OPTIONS",
                    payload: []
                });  
                this.props.dispatch({
                    type: "SELECTED_OPTION",
                    payload: ""
                });  
                this.props.dispatch({
                    type: "RESULT_IMAGES",
                    payload: []
                });  
                this.props.dispatch({
                    type: "SELECTED_IMAGE",
                    payload: {}
                });  
                this.setState(
                    {content: <SearchPage/>}
                );
                break;
            default: 
                this.setState(
                    {content: ""}
                );
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
                    {this.state.content}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    cat_options: state.cat_options,
    subcat_options: state.subcat_options,
    selected_option: state.selected_option,
    result_images: state.result_images
});

export default connect(mapStateToProps)(FacsimilePage);
