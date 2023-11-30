import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
import CheckBoxField from "../../common/Form/CheckBoxField";
import * as yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    remembered: false,
  });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
    setEnterError(null);
  };

  const validateShema = yup.object().shape({
    password: yup.string().required("Пароль должен быть введен"),
    email: yup.string().required("Email должен быть введен"),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await signIn(data);
      navigate("/");
    } catch (error) {
      setEnterError(error.message);
    }
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
      {enterError && <p className="text-danger">{enterError}</p>}

      <button className="btn btn-primary w-100" disabled={!isValid}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
