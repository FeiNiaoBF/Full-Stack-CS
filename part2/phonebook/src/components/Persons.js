import React from 'react';
import TextPerson from './TextPerson';

const Persons = ({ personsToShow, toDelPerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <TextPerson
          key={person.id}
          name={person.name}
          number={person.number}
          toDelPerson={() => toDelPerson(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default Persons;
