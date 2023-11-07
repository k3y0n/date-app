import PropTypes from "prop-types";

const Bookmark = ({ bookmark, id, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(id)}
      className={`bi bi-bookmark${bookmark ? "-heart-fill" : ""} `}
    ></button>
  );
};

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Bookmark;
