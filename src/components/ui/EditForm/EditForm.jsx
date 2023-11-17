import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
import * as yup from "yup";
import MultiSelectField from "../../common/Form/MultiSelectField";
import RadioField from "../../common/Form/RadioField";
import SelectField from "../../common/Form/SelectField";
import API from "../../../api";
import { useNavigate } from "react-router-dom";

const EditForm = ({ user }) => {
  const { _id: id, name, email, profession, sex, qualities } = user;

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };

  const navigate = useNavigate()
  const [data, setData] = useState({
    name: name,
    email: email,
    profession: profession.name,
    sex: sex,
    qualities: transformData(qualities),
  });

  const [professions, setProfessions] = useState([]);
  const [qualitiesList, setQualitiesList] = useState([]);
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
    name: yup
      .string()
      .required("Имя должен быть введен")
      .min(8, "Имя должен быть не меньше 3 символов"),
  });

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
      setQualitiesList(qualitiesList);
    });
  }, []);

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
    const { profession, qualities } = data;
    API.users
      .update(id, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => navigate(`/users/${data._id}`));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <TextField
        label="Имя"
        name="name"
        onChange={handleChange}
        value={data.name}
        error={errors.name}
      />
      <TextField
        label="Email"
        name="email"
        onChange={handleChange}
        value={data.email}
        error={errors.email}
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
        options={qualitiesList}
        defaultValue={data.qualities}
        name="qualities"
        label="Качества"
      />
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Войти
      </button>
    </form>
  );
};

export default EditForm;
