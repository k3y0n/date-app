import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
import * as yup from "yup";
import MultiSelectField from "../../common/Form/MultiSelectField";
import RadioField from "../../common/Form/RadioField";
import SelectField from "../../common/Form/SelectField";
import API from "../../../api";
import { useNavigate, useParams } from "react-router-dom";

const EditForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  });
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    API.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id,
      }))
    );
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

  useEffect(() => {
    validate();
  }, [data]);

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validateShema = yup.object().shape({
    name: yup
      .string()
      .required("Имя должен быть введен")
      .min(8, "Имя должен быть не меньше 3 символов"),
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
    const { profession, qualities } = data;
    API.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => navigate(`/users/${data._id}`));
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    });
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
        defaultValue={data.qualities}
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши качества"
      />
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Обновить
      </button>
    </form>
  );
};

export default EditForm;
