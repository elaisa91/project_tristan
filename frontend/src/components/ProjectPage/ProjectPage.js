import React from 'react';
import { connect } from 'react-redux';
import './ProjectPage.css';
import SubMenu from '../SubMenu/SubMenu.js';
import TextThree from '../Texts/TextThree';
import TextFour from '../Texts/TextFour';
import TextSeven from '../Texts/TextSeven';

class ProjectPage extends React.Component{
    constructor (props) { 
        super(props); 
        this.state = {
            sub_menu_items: [{desc: "Team", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Methodology", image: process.env.PUBLIC_URL + '/university_logo.png'},
                            {desc: "Licence", image: process.env.PUBLIC_URL + '/university_logo.png'}]
        };
    }
    componentDidMount(){
        this.props.dispatch({
            type: 'WORK_TEAM_VISIBLE',
            payload: true
        });
        this.props.dispatch({
            type: 'METHODS_VISIBLE',
            payload: false
        });
        this.props.dispatch({
            type: 'LICENCE_VISIBLE',
            payload: false
        });
    }
    handleClick(i){
        switch (this.state.sub_menu_items[i].desc){
            case "Team":
                this.props.dispatch({
                    type: 'WORK_TEAM_VISIBLE',
                    payload: true
                });
                this.props.dispatch({
                    type: 'METHODS_VISIBLE',
                    payload: false
                });
                this.props.dispatch({
                    type: 'LICENCE_VISIBLE',
                    payload: false
                });
                break;
            case "Methodology":
                this.props.dispatch({
                    type: 'WORK_TEAM_VISIBLE',
                    payload: false
                });
                this.props.dispatch({
                    type: 'METHODS_VISIBLE',
                    payload: true
                });
                this.props.dispatch({
                    type: 'LICENCE_VISIBLE',
                    payload: false
                });
                break;
            case "Licence":
                this.props.dispatch({
                    type: 'WORK_TEAM_VISIBLE',
                    payload: false
                });
                this.props.dispatch({
                    type: 'METHODS_VISIBLE',
                    payload: false
                });
                this.props.dispatch({
                    type: 'LICENCE_VISIBLE',
                    payload: true
                });
                break;
        }
    }
    render(){
        return(
            <div className='project-page'>
                <div className='content'>
                    <TextThree visible = {this.props.work_team_visible}/>
                    <TextFour visible = {this.props.methods_visible}/>
                    <TextSeven visible = {this.props.licence_visible}/>
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
    work_team_visible: state.work_team_visible,
    methods_visible: state.methods_visible,
    licence_visible: state.licence_visible
})

export default connect(mapStateToProps)(ProjectPage);
