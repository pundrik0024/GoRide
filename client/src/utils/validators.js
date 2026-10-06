export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(String(phone));
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateAge = (age) => {
  const num = parseInt(age, 10);
  return !isNaN(num) && num >= 1 && num <= 120;
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};
