import { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import InputText from "../../common/Form/InputText";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validateConfig = {
    email: {
      isRequired: { message: "Email must be provided" },
      isEmail: { message: "Email  not correct" },
    },
    password: {
      isRequired: { message: "Password must be provided" },
      isCapital: {
        message: "Password must be at least one capital letter",
      },
      isDigit: {
        message: "Password must be at least one digit ",
      },
      isMin: {
        message: "Password must be minimum 8 characters ",
        value: 8,
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <InputText
        label="email"
        name="email"
        onChange={handleChange}
        value={data.email}
        error={errors.email}
      />
      <InputText
        label="password"
        name="password"
        onChange={handleChange}
        type="password"
        value={data.password}
        error={errors.password}
      />
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
