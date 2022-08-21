import { NextApiHandler } from 'next';
import { getUserById } from '../../../prisma/user';
import { UserModel } from '../../../prisma/zod';

const UserHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    const { id: rawId } = req.query;
    const id = UserModel.shape.id.parse(rawId);
    const user = await getUserById(id);

    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User not found' });
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default UserHandler;