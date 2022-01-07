import React from 'react';
import './Home.css';
import Header from '../Header/Header.js';
import SubMenuItem from '../SubMenuItem/SubMenuItem';

class Home extends React.Component{
    render(){
        return(
            <div className='home'>
                <Header/>
                <SubMenuItem 
                    image = {process.env.PUBLIC_URL + '/university_logo.png'}
                    desc = {"Il Tristano"}
                />
                <SubMenuItem 
                    image = {process.env.PUBLIC_URL + '/university_logo.png'}
                    desc = {"Gottfried von Strassburg"}
                />
            </div>
        );
    }
}

export default Home;
