import React from 'react';
import './SubMenu.css';
import SubMenuItem from '../SubMenuItem/SubMenuItem.js';

class SubMenu extends React.Component {

    renderSubMenuItem(i){
        return (
            
            <SubMenuItem
                image = {this.props.sub_menu_items[i].image}     
                desc = {this.props.sub_menu_items[i].desc}    
                onClick = {() => this.props.onClick(i)}
            />
        );
    }

    render() {
       
        const sub_menu_items = this.props.sub_menu_items;
        const sub_menu_list = [];
        for (var i = 0; i<sub_menu_items.length; i++){
           sub_menu_list.push(this.renderSubMenuItem(i));
        }
        
        return (
            
            <div className = 'sub-menu'>
                {sub_menu_list}
            </div>
        );
    }
}

export default SubMenu;