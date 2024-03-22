import React from 'react';

const TextPerson = ({ name,number, toDelPerson }) => {
  return (
    <div>
      {name} {number}
      <button onClick={toDelPerson}>delete</button>
    </div>
  );
};

export default TextPerson;
