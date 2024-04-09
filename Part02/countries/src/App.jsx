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
  if (!countries) {
    return null;
  }
  const handleCountryChange = (e) => {
    setSearchName(e.target.value);
  };
  const showCountry = (country) => {
    // event.preventDefault();
    //setSearchName(event.target.value);

    setSearchName(country.name.common);
  };
  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(searchName.toLowerCase())
  );

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
