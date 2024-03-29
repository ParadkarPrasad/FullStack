import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/phoneBook";
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [listToShow, setListToShow] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");

  const addName = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };

    axios.post("http://localhost:3001/persons", personObj).then((response) => {
      console.log(response);
    });
    // check if person is already in the contacts
    const uniqueNames = persons.some(
      (people) => people.name.toLowerCase() === newName.toLowerCase()
    );
    if (uniqueNames) {
      window.alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat(personObj));
    }
    setNewName("");
  };

  // Remove person from the phonebook
  // const deleteContact = (id, name) => {
  //   if (window.confirm(`Are you sure you want to delete ${name}?`)) {
  //     let newList = persons.filter((person) => {
  //       person.id !== id;
  //       console.log(id);
  //       personService.removePerson(id).then((res) => {
  //         console.log(res);
  //         console.log(setPersons(newList));
  //         setListToShow(newList);
  //       });
  //     });
  //   }
  // };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNumber(e.target.value);
  };

  const showSearchResults = (e) => {
    setListToShow(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter={listToShow} eventHandler={showSearchResults} />

      <PersonForm
        addContact={addName}
        name={newName}
        nameHandler={handleNewName}
        number={newNumber}
        numberHandler={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        key={persons.name}
        persons={persons}
        nameFilter={listToShow}
        //deleteContact={deleteContact}
      />
    </>
  );
};

export default App;
