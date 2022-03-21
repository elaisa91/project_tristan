import React from 'react';
import './Footer.css';

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <footer>
                    <div className='ver-university'>
                        <div className='img'>
                            <img src={process.env.PUBLIC_URL + '/university_logo_footer.png'} alt="Università di Verona" />
                        </div>
                        <div className='info'>
                            <p>Università degli Studi di Verona, Via dell'Artigliere, 8 37129 Verona.</p>
                        </div>
                        <div className='copyright'>
                            <p>© 2022. Università di Verona. All rights reserved.</p>
                        </div>
                    </div>
                    <div className='bibliothek'>
                        <div className='img'>
                            <p>In collaboration with:</p>
                            <img src={process.env.PUBLIC_URL + '/Bayerische_Staatsbibliothek_logo.png'} alt="Bayerische Staatsbibliothek" />
                        </div>
                        <div className='info'>
                            <p>Bayerischen Staatsbibliothek, München, Institut für Bestandserhaltung und Restaurierung</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;