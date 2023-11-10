import { useEffect, useState } from "react";
import InputText from "../components/InputText";
import { validator } from "../utils/validator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

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
    password: { isRequired: { message: "Password must be provided" } },
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
    <form onSubmit={handleSubmit}>
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
      <button className="btn btn-primary">Log in</button>
    </form>
  );
};

export default Login;
