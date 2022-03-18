import React from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import SubMenu from '../SubMenu/SubMenu.js';
import TextOne from '../Texts/TextOne';
import TextTwo from '../Texts/TextTwo';

class HomePage extends React.Component{
    constructor (props) { 
        super(props); 
        this.state = {
            sub_menu_items: [{desc: "Short introduction", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Tristan (CGM51)", image: process.env.PUBLIC_URL + '/university_logo.png'}]
        };
    }
    handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Short introduction":
                this.props.dispatch({
                    type: 'INTRODUCTION_VISIBLE',
                    payload: true
                });
                this.props.dispatch({
                    type: 'CGM51_VISIBLE',
                    payload: false
                });
                break;
            case "Tristan (CGM51)":
                this.props.dispatch({
                    type: 'INTRODUCTION_VISIBLE',
                    payload: false
                });
                this.props.dispatch({
                    type: 'CGM51_VISIBLE',
                    payload: true
                });
                break;
        }
    }
    render(){
        return(
            <div className='home-page'>
                <div className='content'>
                    <TextOne visible = {this.props.introduction_visible} />
                    <TextTwo visible = {this.props.cgm51_visible} />
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
    introduction_visible: state.introduction_visible,
    cgm51_visible: state.cgm51_visible
})

export default connect(mapStateToProps)(HomePage);
