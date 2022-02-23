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
        };
    }
    handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Descrizione del facsimile":
                this.props.dispatch({
                    type: "CONTENT",
                    payload: <TextEight/>
                }); 
                break;
            case "Illustrazioni": 
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
                    payload: []
                }); 
                this.props.dispatch({
                    type: "SELECTED_IMAGE",
                    payload: {}
                });
                
                this.props.dispatch({
                    type: "CONTENT",
                    payload: <SearchPage/>
                }); 
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
                    {this.props.content}
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
    result_images: state.result_images,
    content: state.content
})

export default connect(mapStateToProps)(FacsimilePage);
