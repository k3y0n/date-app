import { useEffect, useState } from "react";
import InputText from "../../common/Form/InputText";
import CheckBoxField from "../../common/Form/CheckBoxField";
import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    remembered: false,
  });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validateShema = yup.object().shape({
    password: yup
      .string()
      .required("Password must be provided")
      .matches(/[A-Z]+/g, "Password must be at least one capital letter")
      .matches(/\d+/g, "Password must be at least one digit")
      .matches(/(?=.*[!@#$%^&*])/g, "Password must be at least one spec letter")
      .min(8, "Password must be minimum 8 characters"),
    email: yup
      .string()
      .required("Email must be provided")
      .email("Email  not correct"),
  });

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    validateShema
      .validate(data)
      .then(() => setErrors({}))
      .catch((e) => setErrors({ [e.path]: e.message }));
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
        label="Email"
        name="email"
        onChange={handleChange}
        value={data.email}
        error={errors.email}
      />
      <InputText
        label="Password"
        name="password"
        onChange={handleChange}
        type="password"
        value={data.password}
        error={errors.password}
      />
      <CheckBoxField
        value={data.remembered}
        name="remembered"
        onChange={handleChange}
      >
        Remember me
      </CheckBoxField>
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
