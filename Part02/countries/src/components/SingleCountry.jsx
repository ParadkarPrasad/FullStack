const SingleCountry = ({ oneCountry }) => {
  return (
    <>
      <h1>{oneCountry.name}</h1>
      <div>Capital: {oneCountry.capital}</div>
      <div>Population: {oneCountry.population}</div>
      <div>
        <h3>Lanuages</h3>
        <ul>
          {oneCountry.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <div>
          <img
            alt="Country flag"
            src={oneCountry.flag}
            height="100"
            width="100"
          />
        </div>
      </div>
    </>
  );
};

export default SingleCountry;
