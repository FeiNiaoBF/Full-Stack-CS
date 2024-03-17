import Name from './components/Name';

// Search the person
const searchPerson = (event) => {
  return Persons.filter((p) =>
    p.name.toLowerCase().includes(event.toLowerCase())
  );
};

const Persons = ({ persons, showAll, filterWord }) => {
  const personsToShow = showAll ? persons : searchPerson(filterWord);

  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Name key={person.name} person={person} />
      ))}
    </div>
  );
};

export default Persons;
