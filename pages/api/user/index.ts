import { NextApiHandler } from 'next';
import { addUser, getAllUsers, getUserByEmail, getUserById } from '../../../prisma/user';
import { UserModel } from '../../../prisma/zod';

const UserHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    const { userId: rawId, email: rawEmail } = req.query;

    if (rawId) {
      const id = UserModel.shape.id.parse(rawId);
      const user = await getUserById(id);
      return res.status(200).json(user);

    } else if (rawEmail) {
      const email = UserModel.shape.email.parse(rawEmail);
      const user = await getUserByEmail(email);
      return res.status(200).json(user);

    } else {
      const users = await getAllUsers();
      return res.status(200).json(users);
    }

  }
  case 'POST': {
    const user = await addUser(req.body);
    return res.status(200).json(user);
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default UserHandler;