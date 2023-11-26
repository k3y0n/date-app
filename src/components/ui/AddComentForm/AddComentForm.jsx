import { useEffect, useState } from "react";
import API from "../../../api/index";
import SelectField from "../../common/Form/SelectField";
import * as yup from "yup";
import TextAreaField from "../../common/Form/TextAreaField";
import PropTypes from "prop-types";

const AddComentForm = ({ onAdd }) => {
  const [data, setData] = useState({ comment: "", user: "" });
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

  const validateShema = yup.object().shape({
    user: yup.string().required("Пользователь должен быть выбран"),
    comment: yup.string().required("Комментарий не должен быть  пустым"),
  });

  const validate = () => {
    validateShema
      .validate(data)
      .then(() => setErrors({}))
      .catch((e) => setErrors({ [e.path]: e.message }));
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({ comment: "", user: "" });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const { comment, user } = data;
    const dataSend = { content: comment, userId: user };
    onAdd(dataSend);
    clearForm();
    console.log(data);
  };

  const userList = users.map((user) => ({
    label: user.name,
    value: user._id,
  }));

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit} className="needs-validation">
        <SelectField
          label="Выберете пользователя"
          name="user"
          defaultOption="Select..."
          onChange={handleChange}
          options={userList}
          value={data.user}
          error={errors.user}
        />
        <TextAreaField
          minLength="3"
          name="comment"
          onChange={handleChange}
          value={data.comment}
          error={errors.comment}
        />
        <button className="btn btn-primary w-100" disabled={!isValid}>
          Опубликовать
        </button>
      </form>
    </div>
  );
};

AddComentForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddComentForm;