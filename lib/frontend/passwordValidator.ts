// Password strengths
export const enum PasswordCheckStrength {
  Short,
  Weak,
  Ok,
  Strong,
  Common
}

// Defines the minimum length of a password for it to be considered strong
const MINIMUM_LENGTH = 6;

// Regex to check for a common password string - all based on 5+ length passwords
const COMMON_PASSWORD_PATTERNS = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

export const checkPasswordStrength = (password: string): PasswordCheckStrength => {
  // Build up the strenth of our password
  let numberOfElements = 0;
  numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
  numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
  numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
  numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

  // Assume we have a poor password already
  let currentPasswordStrength = PasswordCheckStrength.Short;

  // Check the strength of this password using some simple rules
  if (password === null || password.length < MINIMUM_LENGTH) {
    currentPasswordStrength = PasswordCheckStrength.Short;

  // Tests how many secure elements are in the password
  } else if (numberOfElements <= 2) {
    currentPasswordStrength = PasswordCheckStrength.Weak;

  // Tests if the password is a common password
  } else if (COMMON_PASSWORD_PATTERNS.test(password)) {
    currentPasswordStrength = PasswordCheckStrength.Common;

  // Tests how many secure elements are in the password
  } else if (numberOfElements === 3) {
    currentPasswordStrength = PasswordCheckStrength.Ok;

  // If there are 4 or more secure elements, then the password is strong
  } else {
    currentPasswordStrength = PasswordCheckStrength.Strong;
  }

  // Return the strength of this password
  return currentPasswordStrength;
};
