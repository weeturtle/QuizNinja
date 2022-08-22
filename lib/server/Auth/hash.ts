import { hash as argonHash } from 'argon2';

const hash = (password: string) => {
  return argonHash(password);
};

export default hash;