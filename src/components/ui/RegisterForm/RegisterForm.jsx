import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
import SelectField from "../../common/Form/SelectField";
import RadioField from "../../common/Form/RadioField";
import MultiSelectField from "../../common/Form/MultiSelectField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../../store/qualitySlice.js";
import { getProfessions } from "../../../store/professionsSlice.js";
import { signUp } from "../../../store/usersSlice.js";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    name: "",
    sex: "male",
    qualities: [],
  });
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());
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

  const validateSchema = yup.object().shape({
    sex: yup.string().required("Выберете ваш пол"),
    qualities: yup
      .array()
      .min(1, "Выберете ваши качества")
      .required("Выберете ваши качества"),
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
      .min(3, "Имя должно быть не меньше 3 символов"),
    email: yup
      .string()
      .required("Email должен быть введен")
      .matches(/^\S+@\S+\.\S+$/g, "Email  не правильный"),
  });

  const validate = async () => {
    try {
      await validateSchema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (e) {
      const newErrors = {};
      e.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    dispatch(signUp(newData));
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
        error={errors.sex}
        onChange={handleChange}
      />
      <MultiSelectField
        onChange={handleChange}
        options={qualitiesList}
        defaultValue={data.qualities}
        error={data.qualities}
        name="qualities"
        label="Качества"
      />
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Зарегестрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
