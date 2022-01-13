import React from 'react';
import './HomePage.css';
import Header from '../Header/Header.js';
import SubMenu from '../SubMenu/SubMenu.js';
import TextOne from '../Texts/TextOne';
import TextTwo from '../Texts/TextTwo';

class HomePage extends React.Component{
    constructor (props) { 
        super(props); 
        this.state = {
            sub_menu_items: [{desc: "Il Tristano", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Gottfried von Strassburg", image: process.env.PUBLIC_URL + '/university_logo.png'}],
            content : ""
        };
    }
    handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Il Tristano":
                this.setState(
                    {content: <TextOne/>}
                );
                break;
            case "Gottfried von Strassburg":
                this.setState(
                    {content: <TextTwo/>}
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
            <div className='home'>
                <Header/>
                <SubMenu
                    sub_menu_items = {this.state.sub_menu_items}
                    onClick = {(i) => this.handleClick(i)}
                />
                
                {this.state.content}
            </div>
        );
    }
}

export default HomePage;
