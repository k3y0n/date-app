import { useEffect, useState } from "react";
import TextField from "../../common/Form/TextField";
import API from "../../../api/index";
import SelectField from "../../common/Form/SelectField";
import * as yup from "yup";

const AddComentForm = () => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    API.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validateShema = yup.object().shape({});

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
      <SelectField
        label="Выберете пользователя"
        name="user"
        defaultOption="Select..."
        onChange={handleChange}
        options={users}
        value={data.users}
        error={errors.users}
      />
      <TextField
        label="Email"
        name="email"
        type="textarea"
        onChange={handleChange}
        value={data.email}
        error={errors.email}
      />

      <button className="btn btn-primary w-100" disabled={!isValid}>
        Опубликовать
      </button>
    </form>
  );
};

export default AddComentForm;
