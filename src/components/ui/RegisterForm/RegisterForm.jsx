import { useEffect, useState } from "react";
import InputText from "../../common/Form/InputText";
import { validator } from "../../../utils/validator";
import API from "../../../api/index";
import SelectField from "../../common/Form/SelectField";

const RegisterForm = () => {
  const [data, setData] = useState({ email: "", password: "", profession: "" });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  const handleChange = ({ target }) => {
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
        label="email"
        name="email"
        onChange={handleChange}
        value={data.email}
        error={errors.email}
      />
      <InputText
        label="password"
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
          professions={professions}
          value={data.profession}
          error={errors.profession}
        />
      )}
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
