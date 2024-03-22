import React, { useEffect } from 'react';
import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './service/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filterWord, setFilter] = useState('');
  // react hook
  const hook = () => {
    console.log('effect');
    personsService.get().then((initialPersons) => {
      setPersons(initialPersons);
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
      personsService.update(id, changePerson).then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
        setNewName('');
        setNewNumber('');
      });
    } else {
      // create a object about person
      const personObject = {
        name: newName,
        number: newNumber,
      };
      // create a new person
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
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

  // delete a person button

  const toDelPerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (person) {
      const confirmed = window.confirm(`Delete ${person.name}`);
      if (confirmed) {
        personsService.del(id).then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        });
      }
    } else {
      console.log(`Not id is '${id}' person`);
    }
  };

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
      <Persons personsToShow={personsToShow} toDelPerson={toDelPerson} />
    </div>
  );
};

export default App;
