import React from 'react';
import './Text.css';

class TextEight extends React.Component{
    constructor (props) { 
        super(props); 
    }
    render(){
        return(
            this.props.visible &&
            <div className='content-text'>
                <p>Lorem ipsum dolor sit amet, ea cibo aperiam vim, no summo gubergren vis. In quo adhuc affert, duo vide putant diceret ne. Ea usu dolor dolore argumentum, mea id viderer conceptam scripserit, sit no inimicus assentior. Doctus elaboraret appellantur ut sea, homero maiestatis voluptatibus in vis. Vis elit utroque facilisi at.</p>
                <p>Lorem ipsum dolor sit amet, ea cibo aperiam vim, no summo gubergren vis. In quo adhuc affert, duo vide putant diceret ne. Ea usu dolor dolore argumentum, mea id viderer conceptam scripserit, sit no inimicus assentior. Doctus elaboraret appellantur ut sea, homero maiestatis voluptatibus in vis. Vis elit utroque facilisi at.</p>
                <p>Lorem ipsum dolor sit amet, ea cibo aperiam vim, no summo gubergren vis. In quo adhuc affert, duo vide putant diceret ne. Ea usu dolor dolore argumentum, mea id viderer conceptam scripserit, sit no inimicus assentior. Doctus elaboraret appellantur ut sea, homero maiestatis voluptatibus in vis. Vis elit utroque facilisi at.</p>
                <p>Lorem ipsum dolor sit amet, ea cibo aperiam vim, no summo gubergren vis. In quo adhuc affert, duo vide putant diceret ne. Ea usu dolor dolore argumentum, mea id viderer conceptam scripserit, sit no inimicus assentior. Doctus elaboraret appellantur ut sea, homero maiestatis voluptatibus in vis. Vis elit utroque facilisi at.</p>
                <p>Lorem ipsum dolor sit amet, ea cibo aperiam vim, no summo gubergren vis. In quo adhuc affert, duo vide putant diceret ne. Ea usu dolor dolore argumentum, mea id viderer conceptam scripserit, sit no inimicus assentior. Doctus elaboraret appellantur ut sea, homero maiestatis voluptatibus in vis. Vis elit utroque facilisi at.</p>
            </div>
        );
    }
}

export default TextEight;