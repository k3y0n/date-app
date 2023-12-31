import { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, error, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const getValidClass = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const togglePassword = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <input
          className={getValidClass()}
          width={"10px"}
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {type === "password" && (
          <button className="btn btn-outline-primary" onClick={togglePassword}>
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")} />
          </button>
        )}
        {error && <div className="invalid-feedback">{`${error}`}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: "text",
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
