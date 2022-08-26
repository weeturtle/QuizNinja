import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

// Defines the type of the request object
type req = IncomingMessage & {
  cookies: NextApiRequestCookies;
}

// Extracts the token from the request object
const getToken = (req: req) => {
  // Fetches the cookies from the request object
  const cookies = req.headers.cookie;
  
  // If the cookies are not present, return null
  if (!cookies) {
    return null;
  }

  // Splits the cookies into an array of strings
  // Each string is a cookie with the name and value separated by an equal sign
  // Whitespace is trimmed from the name and value
  // It is then selceted from the array where the name is 'token'
  const token = cookies
    .split(';')
    .find(c => c.trim().startsWith('token='));

  // If the token is not found, return null
  if (!token) {
    return null;
  }

  // Returns the token value as a string
  // If the token is not found, returns an empty string
  return String(token.split('=')[1]) || '';
};

export default getToken;