import CountryClick from "./CountryClick";
import SingleCountry from "./SingleCountry";
const Countries = ({ countryShow, showCountry }) => {
  console.log(showCountry);
  if (countryShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countryShow.length <= 10 && countryShow.length > 1) {
    return <CountryClick countryShow={countryShow} showCountry={showCountry} />;
  }
  if (countryShow.length == 1) {
    return <SingleCountry oneCountry={countryShow[0]} />;
  }
  return <p>No matches</p>;
};
export default Countries;
