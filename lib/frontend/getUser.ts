import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserById } from '../../prisma/user';
import { UserModel } from '../../prisma/zod';
import CookieType from '../../types/cookieType';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = getCookie('token', { req, res }) as string;

  if (!token) {
    return null;
  }

  const secretToken = process.env.JWT_SECRET || 'secret';
  const data = jwt.verify(token, secretToken) as CookieType;

  const user = await getUserById(data.userId);
  console.table(user);

  return UserModel.parse(user);

};

export default getUser;