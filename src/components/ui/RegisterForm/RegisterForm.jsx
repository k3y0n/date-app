import { useEffect, useState } from "react";
import InputText from "../../common/Form/InputText";
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
    sex: "",
    qualities: [],
    license: false,
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
    API.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validateShema = yup.object().shape({
    sex: yup.string().required("Choose your gender"),
    license: yup.string().required("You must be agree with license"),
    profession: yup.string().required("Profession must be provided"),
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
      {professions && (
        <SelectField
          label="Select your profession"
          name="profession"
          defaultOption="Select..."
          onChange={handleChange}
          options={professions}
          value={data.profession}
          error={errors.profession}
        />
      )}
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
        ]}
        value={data.sex}
        name="sex"
        label="Sex"
        onChange={handleChange}
      />
      {qualities && (
        <MultiSelectField
          onChange={handleChange}
          options={qualities}
          name="qualities"
          label="Qualities"
        />
      )}
      <CheckBoxField
        value={data.license}
        name="license"
        onChange={handleChange}
        error={errors.license}
      >
        Agree with license
      </CheckBoxField>
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
