import PropTypes from "prop-types";

const Caret = ({ order }) => {
  const orderType = order === "asc" ? "up" : "down";
  return <i className={`bi bi-caret-${orderType}-fill`}></i>;
};

Caret.propTypes = {
  order: PropTypes.string.isRequired,
};

export default Caret;
