// import { useState, useEffect } from "react";

//import personService from "./services/phoneBook";
// const App = () => {
//   const [persons, setPersons] = useState([]);
//   const [listToShow, setListToShow] = useState("");

//   const [newName, setNewName] = useState("");
//   const [newNumber, setNumber] = useState("");

//   useEffect(() => {
//     console.log("effect");
//     personService.getAll().then((returnedPerson) => {
//       setPersons(returnedPerson);
//       setListToShow(returnedPerson[0].name);
//     });
//   });

//   const addName = (e) => {
//     e.preventDefault();
//     const personObj = {
//       name: newName,
//       number: newNumber,
//     };

//     axios.post("http://localhost:3001/persons", personObj).then((response) => {
//       console.log(response);
//     });
//     //check if person is already in the contacts
//     const uniqueNames = persons.some(
//       (people) => people.name.toLowerCase() === newName.toLowerCase()
//     );
//     if (uniqueNames) {
//       window.alert(`${newName} is already in the phonebook`);
//     } else {
//       setPersons(persons.concat(personObj));
//     }
//     setNewName("");
//   };

//   //Remove person from the phonebook
//   const deleteContact = (id, name) => {
//     if (window.confirm(`Are you sure you want to delete ${name}?`)) {
//       let newList = persons.filter((person) => {
//         person.id !== id;
//       });
//       personService.removePerson(id).then((res) => {
//         console.log(res);
//         setPersons(newList);
//         setListToShow(newList);
//       });
//     }
//   };

//   const handleNewName = (e) => {
//     setNewName(e.target.value);
//   };

//   const handleNewNumber = (e) => {
//     setNumber(e.target.value);
//   };

//   const showSearchResults = (e) => {
//     setListToShow(e.target.value);
//   };
//   console.log(typeof listToShow);
//   return (
//     <>
//       <h2>Phonebook</h2>
//       <Filter filter={listToShow} eventHandler={showSearchResults} />

//       <PersonForm
//         addContact={addName}
//         name={newName}
//         nameHandler={handleNewName}
//         number={newNumber}
//         numberHandler={handleNewNumber}
//       />
//       <h2>Numbers</h2>
//       <Persons
//         key={persons.name}
//         persons={persons}
//         nameFilter={listToShow}
//         deleteContact={deleteContact}
//       />
//     </>
//   );
// };

// export default App;

// json-server --port 3001 --watch db.json
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  });
  const addName = (e) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };
    // Sending data to the server
    axios.post("http://localhost:3001/notes", personObj).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
    // To add only unique names in the phonebook
    const uniqueName = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (uniqueName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObj));
    }
    setNewName("");
    setNewNumber("");
  };
  // To save the changes in the input field
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
      <Persons persons={persons} filter={filter} />
    </>
  );
};

export default App;
