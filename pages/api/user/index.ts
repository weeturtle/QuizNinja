import { NextApiHandler } from 'next';
import { addUser, getAllUsers } from '../../../prisma/user';

const UserHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    const users = await getAllUsers();
    return res.status(200).json(users);
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