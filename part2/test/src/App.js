import { useState } from 'react';
import Note from './components/Note';

const App = ({ notes }) => {
  const [notes, setNotes] = useState(notes);

  const addNode = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
  }
  console.log(notes);
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
