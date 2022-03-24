import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import './TextBox.css';

class TextBox extends React.Component{
    constructor (props) { 
        super(props); 
    }

    render(){
        const text_list = [];
        const notes_list = [];

        for (var el of this.props.transcription_text){
            var text = el['text'];
            var who = "";
            var toWhom = "";
            if ("who" in el){
                who = el['who']+"\n";
                toWhom = el['toWhom'];   
            }
            text_list.push(<div><p>{text}</p><p> <span className = 'bold'>Who:</span> {who} <span className = 'bold'>toWhom:</span> {toWhom}</p></div>
            );
        }

        for (var note of this.props.notes){
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
            <div className='textbox'>
                {this.props.subcategory_desc !== "" &&  this.props.subcategory_desc !== this.props.selected_item?
                    <div className='subcat-desc'>
                        <p>Description:</p> 
                        <p>{this.props.subcategory_desc}</p>
                    </div>
                :
                    null
                }
                {text_list.length>0?
                    <div className='trans-text'>
                        <p>Text: </p>
                        {text_list} 
                    </div>
                :
                    null
                }
                
                {this.props.transcription_style !== ""?
                    <div className='trans-style'>
                        <p>Style:</p> 
                        <p>{this.props.transcription_style}</p>
                    </div>
                :
                    null
                }

                {this.props.transcription_type !== ""?
                    <div className='trans-type'>
                        <p>Type:</p> 
                        <p>{this.props.transcription_type}</p>
                    </div>
                :
                    null
                }

                {this.props.transcription_lang !== ""?
                    <div className='trans-lang'>
                        <p>Language:</p> 
                        <p>{this.props.transcription_lang}</p>
                    </div>
                :
                    null
                }
               {notes_list.length>0?
                    <div className='notes'>
                        <p>Notes:</p> 
                        {notes_list}
                    </div>
                :
                    null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    selected_item: state.selected_item,
    transcription_text : state.transcription_text,
    transcription_style : state.transcription_style,
    transcription_type : state.transcription_type,
    transcription_lang : state.transcription_lang,
    subcategory_desc : state.subcategory_desc,
    notes : state.notes
});

export default connect(mapStateToProps)(TextBox);

