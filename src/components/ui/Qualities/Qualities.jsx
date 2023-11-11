import PropTypes from "prop-types";

const Qualities = ({ qualities }) => {
  return (
    <>
      {qualities.map((item) => (
        <span key={item.name} className={`badge text-bg-${item.color} m-2`}>
          {item.name}
        </span>
      ))}
    </>
  );
};

Qualities.propTypes = {
  qualities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Qualities;
