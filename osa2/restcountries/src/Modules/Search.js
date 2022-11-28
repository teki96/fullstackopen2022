const Search = (props) => {
  return (
    <div>
      <input type="text" value={props.search} onChange={props.searchList} />
    </div>
  );
};

export default Search;
