import React, { useState, useEffect } from "react";
import countryService from "./services/countryService";
import FullInformation from "./components/FullInformation/FullInformation";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);

  const findInformation = async (country) => {
    return await countryService.getByName(country).then((res) => res.data);
  };

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleShow = (countryName) => {
    setSearch(countryName);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length === 1) {
      findInformation(filteredCountries[0].name.common).then((data) =>
        setCountryInfo(data)
      );
    } else {
      setCountryInfo(null);
    }
  }, [search, countries]); // Also depend on countries in case the list changes

  return (
    <>
      find countries <input value={search} onChange={handleChange} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <FullInformation country={countryInfo} />
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca2}>
              {country.name.common}{" "}
              <button onClick={() => handleShow(country.name.common)}>
                Show
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
