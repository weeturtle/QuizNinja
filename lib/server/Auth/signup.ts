import { NextApiHandler } from 'next';
import { addUser } from '../../../prisma/user';
import { NewUserModel } from '../../../prisma/zod';
import hash from './hash';
import setCookies from './setCookies';

const Signup: NextApiHandler = async (req, res) => {
  const {
    firstname: rawFirstName,
    lastname: rawLastName,
    email: rawEmail,
    password: rawPassword,
  } = req.body;

  const hashedPassword = await hash(rawPassword);

  const userParse = NewUserModel.safeParse({
    firstname: rawFirstName,
    lastname: rawLastName,
    email: rawEmail,
    password: hashedPassword,
  });

  console.table(userParse);

  if (!userParse.success) {
    return res.status(422).json({ error: userParse.error });
  }

  const user = await addUser(userParse.data);

  setCookies(user, req, res);

  return res.status(200).json(user);
};

export default Signup;