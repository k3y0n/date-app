import { useEffect, useState } from "react";
import * as yup from "yup";
import TextAreaField from "../../common/Form/TextAreaField";
import PropTypes from "prop-types";

const AddComentForm = ({ onAdd }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validateShema = yup.object().shape({
    content: yup.string().required("Комментарий не должен быть  пустым"),
  });

  const validate = () => {
    validateShema
      .validate(data)
      .then(() => setErrors({}))
      .catch((e) => setErrors({ [e.path]: e.message }));
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({ comment: "" });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd(data);
    clearForm();
  };

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit} className="needs-validation">
        <TextAreaField
          minLength="3"
          name="content"
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
