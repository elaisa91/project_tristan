import React from 'react';
import './Footer.css';

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <footer>
                    <img src={process.env.PUBLIC_URL + '/university_logo_footer.png'} alt="Università di Verona" />
                    <div className='info'>
                        <p>Università degli Studi di Verona</p>
                        <p>Via dell'Artigliere, 8</p>
                        <p>37129, Verona</p>
                    </div>
                    <div className='copyright'>
                        <p>© 2022, Università di Verona. Tutti i diritti riservati.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;