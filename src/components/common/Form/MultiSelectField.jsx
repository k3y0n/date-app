import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return (
    <div className="mb-4">
      <label>{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        name="colors"
        options={optionsArray}
        defaultValue={defaultValue}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.array,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MultiSelectField;
