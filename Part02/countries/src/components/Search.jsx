const Search = ({ search, countryChange }) => {
  return (
    <>
      find countries: <input value={search} onChange={countryChange} />
    </>
  );
};

export default Search;
