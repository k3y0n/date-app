import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
import * as yup from "yup";
import MultiSelectField from "../../common/Form/MultiSelectField";
import RadioField from "../../common/Form/RadioField";
import SelectField from "../../common/Form/SelectField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesStatus } from "../../../store/qualitySlice";
import {
  getProfessions,
  getProfessionsStatus,
} from "../../../store/professionsSlice";
import { getCurrentUserData, updateUser } from "../../../store/usersSlice";

const EditForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsStatus());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesStatus());
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const isValid = Object.keys(errors).length === 0;

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));

  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validateSchema = yup.object().shape({
    name: yup
      .string()
      .required("Имя должно быть введено")
      .min(3, "Имя должно быть не меньше 3 символов"),
    email: yup
      .string()
      .required("Email должен быть введен")
      .matches(/^\S+@\S+\.\S+$/g, "Email  не правильный"),
  });

  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }
  const transformData = (data) => {
    const result = getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id,
    }));
    return result;
  };

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities),
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);

  const validate = () => {
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((e) => setErrors({ [e.path]: e.message }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      return;
    } else {
      const newData = {
        ...data,
        qualities: data.qualities.map((q) => q.value),
      };
      dispatch(updateUser(newData));
      navigate(`/users/${currentUser._id}`);
    }
  };

  return (
    <>
      {!isLoading && Object.keys(professions).length > 0 ? (
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
            defaultValue={data.qualities}
            options={qualitiesList}
            onChange={handleChange}
            name="qualities"
            label="Выберите ваши качества"
          />
          <button className="btn btn-primary w-100" disabled={!isValid}>
            Обновить
          </button>
        </form>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default EditForm;
