import PropTypes from "prop-types";

const RadioField = ({ label, name, value, options, error, onChange }) => {
  const getValidClass = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options.map((option) => (
          <div className="form-check form-check-inline" key={option.name}>
            <input
              className={getValidClass()}
              width={"10px"}
              type="radio"
              id={option.name}
              name={name}
              value={option.value}
              onChange={handleChange}
              checked={option.value === value}
            />
            <label className="form-check-label" htmlFor={option.name}>
              {option.name}
            </label>
          </div>
        ))}
      </div>

      {error && <div className="invalid-feedback">{`${error}`}</div>}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioField;
