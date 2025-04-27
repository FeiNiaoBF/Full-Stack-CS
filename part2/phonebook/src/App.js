import React, { useEffect } from 'react';
import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './service/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filterWord, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  // react hook
  const hook = () => {
    console.log('effect');
    personsService.get().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };
  useEffect(hook, []);

  // 创建一个 helper 函数来设置通知和定时清除
  const setNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000); // 5秒后清除通知
  };

  // add a new person to the phonebook
  const addPersons = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      // 用户已存在，询问是否更新号码
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person
            ));
            setNewName('');
            setNewNumber('');
            setNotification(`Updated ${newName}'s number`, 'success');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            if (error.response && error.response.status === 404) {
              // alert(`Information of ${newName} has already been removed from server`);
              setNotification(
                `Information of ${newName} has already been removed from server`,
                'error'
              );
              setPersons(persons.filter(p => p.id !== existingPerson.id));
            } else {
              console.error('Error updating person:', error);
              setNotification(
                `Failed to update person. Please try again.`,
                'error'
              )
            }
          });
      }
    } else {
      // 用户不存在，创建新条目
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNotification(
          `Added ${newName}`,
          'success'
        );
        console.log('Person created:', returnedPerson);
      })
        .catch(error => {
          console.error('Error creating person:', error);
          setNotification(
            'Failed to add person. Please try again.', 'error');
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
      const confirmed = window.confirm(`Delete ${person.name}?`);
      if (confirmed) {
        personsService.del(id)
          .then(() => {
            // 删除成功
            setPersons(persons.filter((p) => p.id !== id));
            // 使用 helper 函数设置成功通知
            setNotification(`Deleted ${person.name}`, 'success');
          })
          .catch(error => {
            console.error('Error deleting person:', error);
            // 捕获删除错误
            if (error.response && error.response.status === 404) {
              // 如果是 404 错误 (资源已被删除)
              // 使用 helper 函数设置错误通知
              setNotification(
                `Information of ${person.name} has already been removed from server`,
                'error'
              );
              // 确保从本地 state 中移除
              setPersons(persons.filter(p => p.id !== id));
            } else {
              // 处理其他类型的删除错误
              setNotification(
                `Failed to delete ${person.name}. Error: ${error.message}`,
                'error'
              );
            }
          });
      }
    } else {
      // 如果尝试删除一个本地 state 中已经不存在的联系人 (可能已被另一客户端删除)
      console.log(`No person with id '${id}' found in local state.`);
      // 可以选择在这里也给一个通知
      setNotification(`Person with id '${id}' not found. Already removed?`, 'error');
      // 确保从本地 state 中移除 (虽然 find 没找到，但以防万一)
      setPersons(persons.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
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
