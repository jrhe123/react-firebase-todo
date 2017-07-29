import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component {


  constructor(props){
    super(props);

    this.state = {
      newNoteContent: '',
      newNoteDate: ''
    }
  }


  handleUserInput(e){
    this.setState({
      newNoteContent: e.target.value
    })
  }


  writeNote(){

    // pass data to parent component
    this.props.addNote(this.state.newNoteContent, this.refs.date.value);

    this.setState({
      newNoteContent: '',
      newNoteDate: ''
    })   
  }

  render() {
    return (
      <div className="formWrapper">
        <input type="text"
               className="noteInput" 
               placeholder="Add note.." 
               value={this.state.newNoteContent} 
               onChange={this.handleUserInput.bind(this)} />
        <input className="noteInput"
               type="date"
               ref="date" />       
        <button className="noteButton"
                onClick={this.writeNote.bind(this)}>Add Note</button>
      </div>
    );
  }
}

export default NoteForm;
