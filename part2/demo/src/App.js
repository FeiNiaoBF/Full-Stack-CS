import { useEffect, useState } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNode, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  /* hook事件处理函数：
      1. 打印'effect'表示该 React Hook 被使用
      2. 使用 axios 去获取本地服务器的数据
      3. 将 promise 对象中的 data 设置为 notes 状态并打印'promise fulfilled'
      4. 更新 notes 状态
  */
  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/notes').then((response) => {
      console.log('promise fulfilled');
      setNotes(response.data);
    });
  };

  useEffect(hook, []);

  console.log('render', notes.length, 'notes');

  const addNode = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNode,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteObject));
    setNewNote('');
    console.log('button clicked', event.target);
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  // console.log(notes);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show to {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNode}>
        <input value={newNode} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
