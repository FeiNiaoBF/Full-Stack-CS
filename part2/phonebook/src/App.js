import { useState } from 'react';
import Name from './components/Name';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filterWord, setFilter] = useState('');

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
      Filter shown with <input value={filterWord} onChange={filterPerson} />
      <h2>Add a new person</h2>
      <form onSubmit={addPersons}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <Name key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
