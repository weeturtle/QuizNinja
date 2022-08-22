import { NextApiHandler } from 'next';
import { addUser } from '../../../prisma/user';
import { NewUserModel } from '../../../prisma/zod';
import hash from './hash';

const Signup: NextApiHandler = async (req, res) => {
  const {
    firstName: rawFirstName,
    lastName: rawLastName,
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

  if (!userParse.success) {
    return res.status(422).json({ error: userParse.error });
  }

  const user = await addUser(userParse.data);

  return res.status(200).json(user);
};

export default Signup;