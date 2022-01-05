import React from 'react';
import './Footer.css';

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <footer>
                    <img src={process.env.PUBLIC_URL + '/university_logo_footer.png'} alt="Università di Verona" />
                </footer>
            </div>
        );
    }
}

export default Footer;