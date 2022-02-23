import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import './TextBox.css';

class TextBox extends React.Component{
    constructor (props) { 
        super(props); 
    }

    render(){
        const text_list = [];
        const said_list = [];
        const notes_list = [];

        if ('orig' in this.props.transcription_text){
            text_list.push(<p>Orig: {this.props.transcription_text['orig']}</p>);
        }
        if ('reg' in this.props.transcription_text){
            text_list.push(<p>Reg: {this.props.transcription_text['reg']}</p>);
        }

        for (var said in this.props.transcription_said){
            said_list.push(<div className='said'>
                                <p>WHO: {said['who']}</p>
                                <p>TOWHOM: {said['towhom']}</p>
                            </div>
            );
        }

        for (var note in this.props.notes){
            notes_list.push(<p>{note}</p>);
        }

        return (
            <div className='text-box'>
                {text_list.length>0?
                    <div className='trans-text'>
                        Transcription: {text_list} 
                    </div>
                :
                    <div className='trans-text'></div>
                }
                
                {said_list.length>0?
                    <div className='trans-said'>
                        Said: {said_list}
                    </div>
                :
                    <div className='trans-said'></div>
                }
                
                <div className='trans-style'>
                    {this.props.transcription_style !== ""?
                        <p>Transcription style: {this.props.transcription_style}</p>
                    :
                        <p></p>
                    }
                </div>
                <div className='trans-type'>
                    {this.props.transcription_type !== ""?
                        <p>Transcription Type: {this.props.transcription_type}</p>
                    :
                        <p></p>
                    }
                </div>
                <div className='trans-lang'>
                    {this.props.transcription_lang !== ""?
                        <p>Langue: {this.props.transcription_lang}</p>
                    :
                        <p></p>
                    }
                </div>
                <div className='subcat-desc'>
                    {this.props.subcategory_desc !== ""?
                        <p>Description: {this.props.subcategory_desc}</p>
                    :
                        <p></p>
                    }
                </div>
                {notes_list.length>0?
                    <div className='notes'>
                        Notes: {this.props.notes}
                    </div>
                :
                    <div className='notes'></div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    transcription_text : state.transcription_text,
    transcription_said : state.transcription_said,
    trascription_style : state.transcription_style,
    transcription_type : state.transcription_type,
    transcription_lang : state.transcription_lang,
    subcategory_desc : state.subcategory_desc,
    notes : state.notes
});

export default connect(mapStateToProps)(TextBox);

