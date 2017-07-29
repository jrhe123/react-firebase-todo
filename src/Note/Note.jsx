import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';


class Note extends Component {

  constructor(props){
    super(props);

    this.noteContent = this.props.noteContent;
    this.noteDate = this.props.noteDate;
    this.noteId = this.props.noteId;

    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleRemoveNote(id){
    this.props.removeNote(id);
  }

  render() {
    return (
      <div className="note fade-in">
        <span className="closebtn" onClick={() => this.handleRemoveNote(this.noteId)}>
          &times;
        </span>
        <p className="noteContent">{this.noteContent}</p><span className="noteDate">&nbsp;{this.noteDate}</span>
      </div>
    );
  }
}

// Validate props
Note.propTypes = {
  noteContent: PropTypes.string
}


export default Note;
