import React from 'react';
import './ProjectPage.css';
import Navigator from '../Navigator/Navigator.js';
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
            sub_menu_items: [{desc: "Gruppo di lavoro", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Metodo", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Codifica", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Criteri di ricerca", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Licenze", image: process.env.PUBLIC_URL + '/university_logo.png'}],
            content : ""
        };
    }
    handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Gruppo di lavoro":
                this.setState(
                    {content: <TextThree/>}
                );
                break;
            case "Metodo":
                this.setState(
                    {content: <TextFour/>}
                );
                break;
            /*case "Codifica":
                this.setState(
                    {content: <TextFive/>}
                );
                break;
            case "Criteri di ricerca":
                this.setState(
                    {content: <TextSix/>}
                );
                break;
            */
            case "Licenze":
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

export default ProjectPage;
