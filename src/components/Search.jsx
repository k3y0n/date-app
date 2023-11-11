import PropTypes from "prop-types";

const Search = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search user..."
      onChange={handleChange}
      value={search}
    />
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Search;
