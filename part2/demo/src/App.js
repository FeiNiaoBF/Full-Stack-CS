import { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes';
import notes from './services/notes';
import Notification from './components/Notification';
import './index.css';

const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16,
	}
	return (
		<div style={footerStyle}>
			<br />
			<em>Note app, Department of Computer Science, University of Helsinki 2023</em>
		</div>
	);
}
const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);
	const [error, setError] = useState('some error occurred...');
	/* hook事件处理函数：
			1. 打印'effect'表示该 React Hook 被使用
			2. 使用 axios 去获取本地服务器的数据
			3. 将 promise 对象中的 data 设置为 notes 状态并打印'promise fulfilled'
			4. 更新 notes 状态
	*/
	const hook = () => {
		console.log('effect');
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
			console.log('promise fulfilled');
		});
	};

	useEffect(hook, []);

	// console.log('render', notes.length, 'notes');

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			important: Math.random() > 0.5,
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote('');
		});
	};

	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	// console.log(notes);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };
		// debugger;
		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setError(`Note '${note.content}' was already removed from server`);
				setTimeout(() => {
					setError(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== id));
			});
		// console.log(`importance of ${id} needs to be toggled`);
	};

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={error} />
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show to {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				<ul>
					{notesToShow.map((note) => (
						<Note
							key={note.id}
							note={note}
							toggleImportance={() => toggleImportanceOf(note.id)}
						/>
					))}
				</ul>
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">save</button>
			</form>
			<Footer />
		</div>
	);
};

export default App;
