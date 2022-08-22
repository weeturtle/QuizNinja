import { NextApiHandler } from 'next';
import { getUserByEmail } from '../../../prisma/user';
import { UserModel } from '../../../prisma/zod';
import hash from './hash';
import jwt from 'jsonwebtoken';
import { setCookies } from 'cookies-next';

const Signin: NextApiHandler = async (req, res) => {
  const {
    email: rawEmail,
    password: rawPassword,
  } = req.body;

  const email = UserModel.shape.email.parse(rawEmail);
  const password = UserModel.shape.password.parse(rawPassword);

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const hashedPassword = await hash(password);

  if (user.password !== hashedPassword) {
    return res.status(422).json({ message: 'Wrong email or password' });
  }

  const secretToken = process.env.JWT_SECRET;

  if (!secretToken) {
    return res.status(500).json({ message: 'JWT_SECRET is not defined' });
  }

  const token = jwt.sign({
    userId: user.id,
  }, secretToken, {
    expiresIn: '1d',
  });

  setCookies('token', token, {
    req,
    res,
    maxAge: 60 * 60 * 24,
    path: '/'
  });

  return res.status(200).json(user);

};

export default Signin;