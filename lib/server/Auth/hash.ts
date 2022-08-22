import { hash as argonHash } from 'argon2';

// Uses argon2 to hash a password
const hash = (password: string) => {
  return argonHash(password);
};

export default hash;