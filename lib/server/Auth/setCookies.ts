import { User } from '@prisma/client';
import { setCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const setCookies = (user: User, req: NextApiRequest, res: NextApiResponse) => {
  const secretToken = process.env.JWT_SECRET;

  if (!secretToken) {
    return res.status(500).json({ message: 'JWT_SECRET is not defined' });
  }

  const token = jwt.sign({
    userId: user.id,
  }, secretToken, {
    expiresIn: '1d',
  });

  setCookie('token', token, {
    req,
    res,
    maxAge: 60 * 60 * 24,
    path: '/'
  });
};

export default setCookies;