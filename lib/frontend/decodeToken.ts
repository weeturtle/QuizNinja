import CookieType from '../../types/cookieType';
import jwt from 'jsonwebtoken';

// Decode the token and return the user id
const decodeToken = (token: string) => {
  // Extract the secret token from the environment variables
  const secretToken = process.env.JWT_SECRET || 'secret';

  // Decode the token
  const data = jwt.verify(token, secretToken) as CookieType;

  // Return the data containing the user id
  return data;
};

export default decodeToken;