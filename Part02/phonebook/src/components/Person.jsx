const Person = ({ name, number }) => {
  return (
    <li>
      {name} {number}
      {/* <button onClick={() => deleteContact(id, name)}>Delete</button> */}
    </li>
  );
};

export default Person;
