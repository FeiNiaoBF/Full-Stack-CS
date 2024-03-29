import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/** Error */
// axios.get('http://localhost:3001/foobar').then((response) => {
//   const notes = response.data;
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <App notes={notes} />
//   );
// });

/** Good */
// axios.get('http://localhost:3001/notes').then((response) => {
//   const notes = response.data;
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <App notes={notes} />
//   );
// });

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
