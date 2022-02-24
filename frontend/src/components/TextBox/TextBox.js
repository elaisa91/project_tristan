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
                                <p>Who: {said['who']}</p>
                                <p>To Whom: {said['towhom']}</p>
                            </div>
            );
        }

        for (var note of this.props.notes){
            console.log(note)
            var note_s = [];
            if (note.length>0){
                for (var el of note){
                    if(el[1] === 'normal'){
                        note_s.push(el[0]);
                    }else if (el[1] === 'italics') {
                        note_s.push(<i>{el[0]}</i>);
                    }
                }
            }
            notes_list.push(<p>{note_s}</p>);
        }

        return (
            <div>
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
                        Notes: {notes_list}
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
    transcription_style : state.transcription_style,
    transcription_type : state.transcription_type,
    transcription_lang : state.transcription_lang,
    subcategory_desc : state.subcategory_desc,
    notes : state.notes
});

export default connect(mapStateToProps)(TextBox);

