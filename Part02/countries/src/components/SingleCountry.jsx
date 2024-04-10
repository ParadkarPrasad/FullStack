import Weather from "./Weather";
const SingleCountry = ({ oneCountry }) => {
  console.log(oneCountry.flag);
  return (
    <>
      <h1>{oneCountry.name.common}</h1>
      <div>Capital: {oneCountry.capital}</div>
      <div>Population: {oneCountry.population}</div>
      <div>
        <h3>Lanuages</h3>
        <ul>
          {Object.values(oneCountry.languages).map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
        <div>
          <img
            alt="Country flag"
            src={oneCountry.flags.png}
            height="100"
            width="100"
          />
        </div>
        <Weather city={oneCountry.capital} />
      </div>
    </>
  );
};

export default SingleCountry;
