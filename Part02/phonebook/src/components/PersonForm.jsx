const PersonForm = ({
  name,
  nameHandler,
  number,
  numberHandler,
  addContact,
}) => {
  return (
    <div>
      <form onSubmit={addContact}>
        <div>
          name: <input value={name} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={number} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
