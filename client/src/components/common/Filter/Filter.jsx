import PropTypes from "prop-types";

const Filter = ({
  items,
  profession,
  valueProperty,
  contentProperty,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {Array.isArray(items)
        ? items.map((item) => (
            <li
              key={item[valueProperty]}
              className={
                "list-group-item" + (item._id === profession ? " active" : "")
              }
              onClick={() => onItemSelect(item)}
              role="button"
            >
              {item[contentProperty]}
            </li>
          ))
        : Object.keys(items).map((item) => (
            <li
              key={items[item][valueProperty]}
              className={
                "list-group-item" +
                (items[item]._id === profession ? " active" : "")
              }
              onClick={() => onItemSelect(items[item])}
              role="button"
            >
              {items[item][contentProperty]}
            </li>
          ))}
    </ul>
  );
};

Filter.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name",
};

const itemShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

Filter.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.objectOf(itemShape),
    PropTypes.arrayOf(itemShape),
  ]).isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  profession: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
};

export default Filter;
