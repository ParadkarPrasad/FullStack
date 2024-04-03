import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  // console.log(countriesToShow);
  const handleCountryChange = (e) => {
    setSearchName(e.target.value);
  };
  const showCountry = (event) => {
    event.preventDefault();
    setSearchName(event.target.value);
  };
  const countriesToShow = countries.filter((country) => {
    country.name.toLowerCase().includes(searchName.toLowerCase());
  });
  console.log(countriesToShow);
  if (!countriesToShow) {
    return null;
  }
  return (
    <>
      find countries:{" "}
      <Search search={searchName} countryChange={handleCountryChange} />
      <Countries
        country={searchName}
        countryShow={countriesToShow}
        showCountry={showCountry}
      />
    </>
  );
};

export default App;
