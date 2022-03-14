import React from 'react';
import './ProjectPage.css';
import SubMenu from '../SubMenu/SubMenu.js';
import TextThree from '../Texts/TextThree';
import TextFour from '../Texts/TextFour';
import TextFive from '../Texts/TextFive';
import TextSix from '../Texts/TextSix';
import TextSeven from '../Texts/TextSeven';

class ProjectPage extends React.Component{
    constructor (props) { 
        super(props); 
        this.state = {
            sub_menu_items: [{desc: "Work team", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Methods", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Licence", image: process.env.PUBLIC_URL + '/university_logo.png'}],
            content : ""
        };
    }
    handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Work team":
                this.setState(
                    {content: <TextThree/>}
                );
                break;
            case "Methods":
                this.setState(
                    {content: <TextFour/>}
                );
                break;
            case "Licence":
                this.setState(
                    {content: <TextSeven/>}
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
            <div className='project-page'>
                <SubMenu
                    sub_menu_items = {this.state.sub_menu_items}
                    onClick = {(i) => this.handleClick(i)}
                />
                <div className='content'>
                    {this.state.content}
                </div>
                <div className='aside'>
                </div>
            </div>
        );
    }
}

export default ProjectPage;
