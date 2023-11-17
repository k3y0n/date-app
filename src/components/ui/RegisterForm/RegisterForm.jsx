import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
import API from "../../../api/index";
import SelectField from "../../common/Form/SelectField";
import RadioField from "../../common/Form/RadioField";
import MultiSelectField from "../../common/Form/MultiSelectField";
import CheckBoxField from "../../common/Form/CheckBoxField";
import * as yup from "yup";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfessions(professionsList);
    });
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validateShema = yup.object().shape({
    sex: yup.string().required("Выберете ваш пол"),
    license: yup.string().required("Вы должны быть согласны с лицензией"),
    profession: yup.string().required("Профессия должна быть выбрана"),
    password: yup
      .string()
      .required("Пароль должен быть введен")
      .matches(/[A-Z]+/g, "Пароль должен содержать одну заглавную букву")
      .matches(/\d+/g, "Пароль должен содержать одну цифру")
      .matches(/(?=.*[!@#$%^&*])/g, "Пароль должен содержать один специальный символ")
      .min(8, "Пароль должен быть не меньше 8 символов"),
    email: yup
      .string()
      .required("Email должен быть введен")
      .matches(/^\S+@\S+\.\S+$/g, "Email  не правильный"),
  });

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

      <SelectField
        label="Выберете свою профессию"
        name="profession"
        defaultOption="Select..."
        onChange={handleChange}
        options={professions}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
        ]}
        value={data.sex}
        name="sex"
        label="Пол"
        onChange={handleChange}
      />
      <MultiSelectField
        onChange={handleChange}
        options={qualities}
        defaultValue={data.qualities}
        name="qualities"
        label="Качества"
      />
      <CheckBoxField
        value={data.license}
        name="license"
        onChange={handleChange}
        error={errors.license}
      >
        Согласен с лицензией
      </CheckBoxField>
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Зарегестрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
