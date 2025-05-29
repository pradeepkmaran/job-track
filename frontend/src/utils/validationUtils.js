export const isValidEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

export const isValidPassword = (password) => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
};

export const passwordValidationErrors = (password) => {
  const errors = [];
  if (password.length < 8) errors.push('minimum 8 characters');
  if (!/[a-z]/.test(password)) errors.push('at least one lowercase letter');
  if (!/[A-Z]/.test(password)) errors.push('at least one uppercase letter');
  if (!/\d/.test(password)) errors.push('at least one number');
  if (!/[@$!%*?&]/.test(password)) errors.push('at least one special character');

  return errors.length
    ? `Password must contain ${errors.join(', ')}.`
    : '';
};
