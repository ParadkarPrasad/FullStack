const Person = ({ id, deletePerson, name, number }) => {
  return (
    <li>
      {name} {number}
      <button onClick={() => deletePerson(id)}>Delete</button>
    </li>
  );
};

export default Person;
