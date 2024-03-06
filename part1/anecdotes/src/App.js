import { useState } from 'react';

// Button Component
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

// Display Component
const Display = (value) => {
  return <div>has {value.text} votes</div>;
};

const getRandomAnecdotes = (max) => {
  return Math.floor(Math.random() * max);
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
  };

  const maxVotes = Math.max(...votes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}

      <Display text={votes[selected]} />

      <Button text={'vote'} onClick={() => handleVote(selected)} />
      <Button
        text={'next anecdote'}
        onClick={() => setSelected(getRandomAnecdotes(anecdotes.length))}
      />
      <h1>Anecdote with most votes</h1>
      {anecdotes[votes.indexOf(maxVotes)]}
      <Display text={maxVotes} />
    </div>
  );
};

export default App;
