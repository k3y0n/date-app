import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
import SelectField from "../../common/Form/SelectField";
import RadioField from "../../common/Form/RadioField";
import MultiSelectField from "../../common/Form/MultiSelectField";
import CheckBoxField from "../../common/Form/CheckBoxField";
import { useProfessions } from "../../../hooks/useProfession.jsx";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesStatus } from "../../../store/qualitySlice.js";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    name: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const { professions } = useProfessions();
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesStatus());
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));

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
      .matches(
        /(?=.*[!@#$%^&*])/g,
        "Пароль должен содержать один специальный символ"
      )
      .min(8, "Пароль должен быть не меньше 8 символов"),
    name: yup
      .string()
      .required("Имя должно быть введено")
      .min(3, "Имя должно быть не меньше 3 символовов"),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    try {
      await signUp(newData);
      navigate("/");
    } catch (error) {
      console.log("er", error);
      setErrors(error);
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
        label="Имя"
        name="name"
        onChange={handleChange}
        value={data.name}
        error={errors.name}
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
        options={professionsList}
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
        options={qualitiesList}
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
