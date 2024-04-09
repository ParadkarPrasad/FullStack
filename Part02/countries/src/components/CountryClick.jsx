const CountryClick = ({ showCountry, countryShow }) => {
  console.log(showCountry);
  return (
    <>
      {countryShow.map((country) => (
        <div key={country.name}>
          <p>{country.name}</p>
          <button onClick={() => showCountry(country.name.common)}>Show</button>
        </div>
      ))}
    </>
  );
};

export default CountryClick;
