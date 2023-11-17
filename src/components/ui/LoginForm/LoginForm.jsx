import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
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
      .required("Пароль должен быть введен")
      .matches(/[A-Z]+/g, "Пароль должен содержать одну заглавную букву")
      .matches(/\d+/g, "Пароль должен содержать одну цифру")
      .matches(
        /(?=.*[!@#$%^&*])/g,
        "Пароль должен содержать один специальный символ"
      )
      .min(8, "Пароль должен быть не меньше 8 символов"),
    email: yup
      .string()
      .required("Email должен быть введен")
      .matches(/^\S+@\S+\.\S+$/g, "Email  не правильный"),
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
      <TextField
        label="Email"
        name="email"
        onChange={handleChange}
        value={data.email}
        error={errors.email}
      />
      <TextField
        label="Пароль"
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
        Запомнить меня
      </CheckBoxField>
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
