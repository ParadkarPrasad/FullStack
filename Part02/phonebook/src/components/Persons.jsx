import Person from "./Person";
const Persons = ({ persons, nameFilter, deleteContact }) => {
  console.log(persons);
  return (
    <div>
      <ul>
        {persons
          .filter((p) =>
            p.name.toLowerCase().startsWith(nameFilter.toLowerCase())
          )
          .map((person) => (
            <Person
              key={person.id}
              id={person.id}
              name={person.name}
              number={person.number}
              //deleteContact={deleteContact}
              //person={person}
              //deletePerson={deletePerson}
            />
          ))}
      </ul>
    </div>
  );
};

export default Persons;
