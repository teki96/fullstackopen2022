import WeatherData from "./WeatherData"

const CountryData = ({ country }) => {
  console.log(country.capital)
  return (
    country.map(country =>
      <div key={country.name.official}>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h3>Languages:</h3>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
        <img src={country.flags.png} alt={country.name.common} width="300rm" height="200rm" />
        <WeatherData capital={country.capital} />
      </div>
    )
  )
}

export default CountryData