import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

type req = IncomingMessage & {
  cookies: NextApiRequestCookies;
}

const getToken = (req: req) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return null;
  }
  const token = cookies.split(';').find(c => c.trim().startsWith('token='));
  if (!token) {
    return null;
  }
  return String(token.split('=')[1]) || '';
};

export default getToken;