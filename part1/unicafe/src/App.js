import { useState } from 'react';

// Button Component
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

// Display Component
const Display = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// Displaying the statistics data is extracted into its own Statistics component
const Statistics = (props) => {
  const { good, neutral, bad } = props;

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  } else
    return (
      <div>
        <table>
          <tbody>
            <Display text={'good'} value={good} />
            <Display text={'neutral'} value={neutral} />
            <Display text={'bad'} value={bad} />
            <Display text={'all'} value={good + neutral + bad} />
            <Display
              text={'average'}
              value={(good - bad) / (good + neutral + bad)}
            />
            <Display
              text={'positive'}
              value={(good / (good + neutral + bad)) * 100 + '%'}
            />
          </tbody>
        </table>
      </div>
    );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
