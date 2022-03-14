import React from 'react';
import './Footer.css';

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <footer>
                    <div className='img'>
                        <img src={process.env.PUBLIC_URL + '/university_logo_footer.png'} alt="Università di Verona" />
                    </div>
                    <div className='info'>
                        <p>Università degli Studi di Verona, Via dell'Artigliere, 8 37129 Verona.</p>
                    </div>
                    <div className='copyright'>
                        <p>© 2022, Università di Verona. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;