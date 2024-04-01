// json-server --port 3001 --watch db.json
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/phoneBook";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((returnedPerson) => {
      setPersons(returnedPerson);
    });
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };
    setNewName("");
    setNewNumber("");
    const personInContacts = persons.find((person) => person.name === newName);
    // Person already in phonebook

    if (personInContacts) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        // changing the existing contact number
        const personwithNewNumber = { ...personInContacts, number: newNumber };
        personService
          .updatePerson(personwithNewNumber.id, personObj)
          .then((changedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === personwithNewNumber.id ? changedPerson : p
              )
            );
          });
      }
    }

    // Sending data to the server

    axios.post("http://localhost:3001/persons", personObj).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });

    // To add only unique names in the phonebook
    // const uniqueName = persons.some(
    //   (person) => person.name.toLowerCase() === newName.toLowerCase()
    // );
    // if (uniqueName) {
    //   alert(`${newName} is already added to phonebook`);
    // } else {
    //   setPersons(persons.concat(personObj));
    // }
  };
  // To delete a contact from the phonebook
  const deleteContact = (id) => {
    const person = persons.find((n) => n.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personService.removePerson(id).then((remvPerson) => {
        setPersons(persons.filter((person) => person.id !== remvPerson.id));
      });
    }
  };

  // To save the changes in the input field as user types
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  console.log(filter);
  return (
    <>
      <h2>Phonebook</h2>

      <Filter filter={filter} search={handleFilterChange} />

      <PersonForm
        addContact={addName}
        name={newName}
        nameHandler={handleNameChange}
        number={newNumber}
        numberHandler={handleNumberChange}
      />

      <h2>Numbers</h2>
      {/* <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((p) => (
            <li key={p.name}>
              {p.name}:{p.number}
            </li>
          ))}
      </ul> */}
      <Persons persons={persons} filter={filter} deletePerson={deleteContact} />
    </>
  );
};
export default App;
