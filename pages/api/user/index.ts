import { NextApiHandler } from 'next';
import hash from '../../../lib/server/Auth/hash';
import { addUser, getAllUsers, getUserByEmail, getUserById, updateUser, updateUserPassword } from '../../../prisma/user';
import { PartialUserModel, UserModel } from '../../../prisma/zod';

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

  case 'PUT': {
    const { id, firstname, lastname, email, password: rawPassword } = req.body;

    console.table({id, firstname, lastname, email});
    const updatedUser = PartialUserModel.parse({id, firstname, lastname, email});



    if (rawPassword) {
      // Hashes the password so that it is not stored in plain text
      const hashedPassword = await hash(rawPassword);

      const password = UserModel.shape.password.parse(hashedPassword);
      await updateUserPassword(id, password);
    }  

    console.log(updatedUser);
    const newUser = await updateUser(updatedUser);
    return res.status(200).json(newUser);
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default UserHandler;