const Countries = ({ filteredList, setFilteredList }) => {

  if (filteredList.length === 1)
    return null

  return (
    <div>
      {filteredList.map(country =>
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => setFilteredList([country])}>Show</button>
        </div>
      )}
    </div>
  )
}

export default Countries