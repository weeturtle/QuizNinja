import { NextApiHandler } from 'next';
import { deleteUser, getUserById } from '../../../prisma/user';
import { UserModel } from '../../../prisma/zod';

// Handles API requests made to /api/user/[id]
const UserHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    // Extracts the user id from the query string
    const { id: rawId } = req.query;

    // Validates the user id
    const id = UserModel.shape.id.parse(rawId);

    // Fetches the user matching the id
    const user = await getUserById(id);

    // If the user exists, return the user
    if (user) {
      return res.status(200).json(user);
    }

    // If the user doesn't exist, return a 404
    return res.status(404).json({ message: 'User not found' });
  }
  case 'DELETE': {
    // Extracts the user id from the query string
    const { id: rawId } = req.query;

    // Validates the user id
    const id = UserModel.shape.id.parse(rawId);

    // Deletes the user
    const user = await deleteUser(id);
    
    // If the user exists, return the user
    // If the user doesn't exist, return a 404
    return user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default UserHandler;