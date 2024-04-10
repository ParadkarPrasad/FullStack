const CountryClick = ({ showCountry, countryShow }) => {
  return (
    <>
      {countryShow.map((country) => (
        <div key={country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => showCountry(country.name.common)}>Show</button>
        </div>
      ))}
    </>
  );
};

export default CountryClick;
