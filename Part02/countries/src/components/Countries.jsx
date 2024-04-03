import CountryClick from "./CountryClick";
const Countries = ({ country, countryShow, showCountry }) => {
  console.log(countryShow);
  if (countryShow.length === 1) {
    return <li>{countryShow[0]}</li>;
  } else if (countryShow.length <= 10) {
    return <CountryClick countryShow={countryShow} showCountry={showCountry} />;
  } else if (country === "") {
    return <li>{countryShow}</li>;
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};
export default Countries;
