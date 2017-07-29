import React, { Component } from 'react';
import './App.css';


// Components
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';


// Firebase config
import firebase from 'firebase/app';
import 'firebase/database';
import {DB_CONFIG} from './Config/config';



class App extends Component {

	constructor(props){

		super(props);

		// Initial firebase
	    this.app = firebase.initializeApp(DB_CONFIG);
	    this.database = this.app.database().ref().child('notes');

		this.state = {
			notes: []
		}


		this.addNote = this.addNote.bind(this);
		this.removeNote = this.removeNote.bind(this);
	}

	componentWillMount(){

		const previousNotes = this.state.notes;

		// add item
		this.database.on('child_added', snap => {

			previousNotes.push({
				id: snap.key,
				noteContent: snap.val().noteContent,
				noteDate: snap.val().noteDate
			})

			this.setState({
				notes: previousNotes
			})
		})


		// remove item
		this.database.on('child_removed', snap => {

			for(var i = 0; i < previousNotes.length; i++){

				if(previousNotes[i].id === snap.key){
					previousNotes.splice(i, 1);
				}
			}	

			this.setState({
				notes: previousNotes
			})
		})
	}



	// Receive data from child components
	addNote(note, date){
		this.database.push().set({noteContent: note, noteDate: date});
	}
	removeNote(noteId){
		this.database.child(noteId).remove();
	}



	render() {

		return (
			<div className="notesWrapper">
				<div className="notesHeader">
					<div className="heading">React & Firebase To-do App</div>
				</div>
				<div className="notesBody">
					{
						this.state.notes.map((note) => {
							return (
								<Note noteContent={note.noteContent} 
									  noteDate={note.noteDate}
									  noteId={note.id} 
									  key={note.id} 
									  removeNote={this.removeNote} />
							)
						})
					}
				</div>
				<div className="notesFooter">
					<NoteForm addNote={this.addNote} />
				</div>
			</div>
		);
	}
}

export default App;
