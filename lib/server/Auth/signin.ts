import { NextApiHandler } from 'next';
import { getUserByEmail } from '../../../prisma/user';
import { UserModel } from '../../../prisma/zod';
import { verify } from 'argon2';
import setCookies from './setCookies';

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


  console.table(user);

  if (!(await verify(user.password, password))) {
    return res.status(422).json({ message: 'Wrong email or password' });
  }

  setCookies(user, req, res);

  return res.status(200).json(user);

};

export default Signin;