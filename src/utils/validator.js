export const validator = (data, config) => {
  const errors = {};
  const validate = (validateField, field, config) => {
    switch (validateField) {
      case "isRequired": {
        if (field.trim() === "") {
          return config.message;
        }
        break;
      }
      case "isEmail": {
        const emailRegex = /^\S+@\S+\.\S+$/g;
        if (!emailRegex.test(field)) {
          return config.message;
        }
        break;
      }
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
