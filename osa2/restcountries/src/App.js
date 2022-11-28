import { useState, useEffect } from "react";
import CountryData from "./Modules/CountryData";
import Countries from "./Modules/Countries";
import Search from "./Modules/Search";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([])
  const [filteredList, setFilteredList] = useState(countries)
  const [search, setSearch] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setFilteredList(response.data)
      })
  }, [])


  const searchList = (event) => {
    const keyword = event.target.value

    if (keyword !== '') {
      const results = countries.filter((country) => {
        return country.name.common.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setFilteredList(results)
    } else {
      setFilteredList(countries)
    }
    setSearch(keyword)
  }

  return (
    <>
      <div>
        <Search search={search} searchList={searchList} />
        {filteredList.length === 1 ? (
          <CountryData country={filteredList} />
        ) : null}
        {filteredList.length > 10 ? (
          <div>Too many results</div>
        ) :
          <Countries filteredList={filteredList} setFilteredList={setFilteredList} />
        }
      </div>
    </>
  )
}

export default App;
