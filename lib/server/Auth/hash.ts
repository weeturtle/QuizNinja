import { hash as argonHash } from 'argon2';

// Uses argon2 to hash a password
// Options are defined here to maintain consistency
// across the application and if updates changed the modules default
const hash = (password: string) => {
  return argonHash(password, {
    hashLength: 32,
    saltLength: 16,
    timeCost: 3,
    memoryCost: 1 << 12,
    parallelism: 1,
    version: 0x13,
  });
};

export default hash;