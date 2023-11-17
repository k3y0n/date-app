import { useEffect, useState } from "react";
import InputText from "../../common/Form/InputText";
import { validator } from "../../../utils/validator";
import API from "../../../api/index";
import SelectField from "../../common/Form/SelectField";
import RadioField from "../../common/Form/RadioField";
import MultiSelectField from "../../common/Form/MultiSelectField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "",
    qualities: [],
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

  const validateConfig = {
    email: {
      isRequired: { message: "Email must be provided" },
      isEmail: { message: "Email  not correct" },
    },
    password: {
      isRequired: { message: "Password must be provided" },
      isCapital: {
        message: "Password must be at least one capital letter",
      },
      isDigit: {
        message: "Password must be at least one digit ",
      },
      isMin: {
        message: "Password must be minimum 8 characters ",
        value: 8,
      },
    },
    profession: {
      isRequired: { message: "Profession must be provided" },
    },
  };

  const validate = () => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
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
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
