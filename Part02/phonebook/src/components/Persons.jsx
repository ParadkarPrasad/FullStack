import Person from "./Person";
const Persons = ({ persons, filter }) => {
  console.log(persons);
  return (
    <div>
      <ul>
        {persons
          .filter((person) =>
            person?.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((p) => (
            <Person key={p.name} name={p.name} number={p.number} />
          ))}
        {/* {persons
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
            />
          ))} */}
      </ul>
    </div>
  );
};

export default Persons;
