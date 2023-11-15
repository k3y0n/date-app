import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  value,
  defaultOption,
  onChange,
  professions,
  error,
}) => {
  const getValidClass = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div>
        <select
          className={getValidClass()}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option disabled value="" defaultValue={defaultOption}>
            {defaultOption}
          </option>
          {professions.map((profession) => (
            <option key={profession._id} value={profession.name}>
              {profession.name}
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
  professions: PropTypes.array.isRequired,
};

export default SelectField;
