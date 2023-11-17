import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  value,
  defaultOption,
  onChange,
  options,
  error,
}) => {
  const getValidClass = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div>
        <select
          className={getValidClass()}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        >
          <option disabled value="" defaultValue={defaultOption}>
            {defaultOption}
          </option>
          {optionsArray.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className="invalid-feedback">{`${error}`}</div>}
      </div>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectField;
