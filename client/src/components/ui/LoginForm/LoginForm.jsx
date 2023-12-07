import { useState } from "react";
import TextField from "../../common/Form/TextField";
import CheckBoxField from "../../common/Form/CheckBoxField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signIn } from "../../../store/usersSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    remembered: false,
  });
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthErrors());

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validateSchema = yup.object().shape({
    password: yup.string().required("Пароль должен быть введен"),
    email: yup.string().required("Email должен быть введен"),
  });

  const validate = () => {
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((e) => setErrors({ [e.path]: e.message }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    dispatch(signIn(data));
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
      {loginError && <p className="text-danger">{loginError}</p>}
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
