import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
      });
  }, []);
  if (!countries) {
    return null;
  }
  const handleCountryChange = (e) => {
    setSearchName(e.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      find countries:{" "}
      <Search search={searchName} countryChange={handleCountryChange} />
      <Countries
        country={searchName}
        countryShow={countriesToShow}
        showCountry={setSearchName}
      />
    </>
  );
};

export default App;
