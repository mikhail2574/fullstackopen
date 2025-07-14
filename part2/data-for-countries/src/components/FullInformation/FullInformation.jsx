import Weather from "../Weather/Weather";

const FullInformation = ({ country }) => {
  if (!country) return null;

  console.log("FullInformation component rendered with country:", country);
  return (
    <div className="country-details">
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area} km²</p>
      <br />
      <p>Languages:</p>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <br />
      <Weather cityName={country.capital} />
    </div>
  );
};

export default FullInformation;
