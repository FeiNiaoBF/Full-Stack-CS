import React, { useEffect } from 'react';
import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filterWord, setFilter] = useState('');
  // react hook
  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3002/persons').then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

  // add a new person to the phonebook
  const addPersons = (event) => {
    event.preventDefault();
    if (persons.some((p) => p.name === newName && p.number !== '')) {
      // debugger;
      return windowAlert(newName);
    } else if (
      // if no number but name in the phonebook
      persons.some((person) => person.name === newName && person.number === '')
    ) {
      // debugger;
      const person = persons.find((p) => p.name === newName);
      const id = person.id;
      const changePerson = { ...person, number: newNumber };
      setPersons(persons.map((p) => (p.id !== id ? p : changePerson)));
      return;
    } else {
      // create a object about person
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      // update persons
      setPersons(persons.concat(personObject));
      // Recovery
      setNewName('');
    }
  };

  // Change the value of newName
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Show alert
  const windowAlert = () => {
    return alert(`${newName} is already added to phonebook`);
  };

  // Search the person
  const searchPerson = (event) => {
    return persons.filter((p) =>
      p.name.toLowerCase().includes(event.toLowerCase())
    );
  };

  const filterPerson = (event) => {
    setShowAll(event.target.value === '' ? true : false);
    setFilter(event.target.value);
  };

  // Show all persons or search person
  const personsToShow = showAll ? persons : searchPerson(filterWord);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWord={filterWord} onFilterChange={filterPerson} />
      <h2>Add a new person</h2>
      <PersonForm
        addPerson={addPersons}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
