import React from "react";
import PropTypes from "prop-types";

const InputText = ({ label, type, name, value, error, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control m-2"
        width={"10px"}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p>{`${error}`}</p>}
    </div>
  );
};

InputText.defaultProps = {
  type: "text",
};

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputText;
