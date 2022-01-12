import React from 'react';
import './Home.css';
import Header from '../Header/Header.js';
import SubMenu from '../SubMenu/SubMenu.js';
import Text from '../Text/Text.js';
import ContentOne from '../Contents/ContentOne';
import ContentTwo from '../Contents/ContentTwo';

class Home extends React.Component{
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
                    {content: <ContentOne/>}
                );
                break;
            case "Gottfried von Strassburg":
                this.setState(
                    {content: <ContentTwo/>}
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
                <Text
                    content = {this.state.content}
                />
                
            </div>
        );
    }
}

export default Home;
