const regexp = {
  username: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  usernameMinmax: /^(?=.{4,20})/,
  pass: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
  passMin: /^(?=.{6,})/,
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const validator = (value, errors = []) => {
  const notEmpty = () => {
    !value.trim() && errors.push("Field cannot be empty");
    return validator(value, errors);
  };

  const isUsernameMinMax = () => {
    !regexp.usernameMinmax.test(value) && errors.push("Login must contain 4 - 20 characters")
    return validator(value, errors);
  }
  const isUsername = () => {
    !regexp.username.test(value) && errors.push("Login must contain letters, numbers, and the symbols _ or . (except beginning and end)")
    return validator(value, errors);
  };
  const isPassword = () => {
    !regexp.pass.test(value) && errors.push("Password contain at least one digit, one lowercase & one uppercase character");
    return validator(value, errors);
  };
  const isPasswordMin = () => {
    !regexp.passMin.test(value) && errors.push("Password must contain minimum 6 characters")
    return validator(value, errors);
  }
  const isEmail = () => {
    !regexp.email.test(value) && errors.push("Email must match like example@gmail.com");
    return validator(value, errors);
  }

  return {
    notEmpty,
    isUsername,
    isUsernameMinMax,
    isPassword,
    isPasswordMin,
    isEmail,
    errors,
  }
};

