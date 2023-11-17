export const validator = (data, config) => {
  const errors = {};
  const validate = (validateField, field, config) => {
    let statusValidate;
    switch (validateField) {
      case "isRequired": {
        if (typeof field === "boolean") {
          statusValidate = !field;
        } else {
          statusValidate = field.trim() === "";
        }
        break;
      }
      case "isEmail": {
        const emailRegex = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegex.test(field);
        break;
      }
      case "isCapital": {
        const capitalRegex = /[A-Z]+/g;
        statusValidate = !capitalRegex.test(field);
        break;
      }
      case "isDigit": {
        const digitRegex = /\d+/g;
        statusValidate = !digitRegex.test(field);
        break;
      }
      case "isMin": {
        statusValidate = field.length <= config.value;
        break;
      }
    }
    if (statusValidate) {
      return config.message;
    }
  };

  for (const field in data) {
    for (const validateField in config[field]) {
      const hasError = validate(
        validateField,
        data[field],
        config[field][validateField]
      );
      if (hasError && !errors[field]) {
        errors[field] = hasError;
      }
    }
  }
  return errors;
};
