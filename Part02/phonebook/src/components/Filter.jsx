const Filter = ({ filter, search }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={search} />
    </div>
  );
};

export default Filter;
