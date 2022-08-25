import { NextApiHandler } from 'next';
import hash from '../../../lib/server/Auth/hash';
import { addUser, getAllUsers, getUserByEmail, getUserById, updateUser, updateUserPassword } from '../../../prisma/user';
import { PartialUserModel, UserModel } from '../../../prisma/zod';

// Handles API requests made to /api/user
const UserHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'GET': {
    // Extracts the user id and email from the query string
    const { userId: rawId, email: rawEmail } = req.query;

    // If the user id is provided, get the user by id
    if (rawId) {
      // Validates the user id
      const id = UserModel.shape.id.parse(rawId);

      // Fetches the user matching the id
      const user = await getUserById(id);

      // If the user exists, return the user
      return res.status(200).json(user);

    // If the email is provided, get the user by email
    } else if (rawEmail) {
      // Validates the email
      const email = UserModel.shape.email.parse(rawEmail);

      // Fetches the user matching the email
      const user = await getUserByEmail(email);
      
      // If the user exists, return the user
      return res.status(200).json(user);

    } else {
      // Fetches all the users
      const users = await getAllUsers();

      // Returns the users
      return res.status(200).json(users);
    }

  }
  case 'POST': {
    // Validates the user data
    // Adds to database returning the new user
    const user = await addUser(req.body);

    // Returns the user
    return res.status(200).json(user);
  }

  case 'PUT': {
    // Extracts and deconstructs the user properties from the request body
    const { id, firstname, lastname, email, password: rawPassword } = req.body;

    // Validates the user with editible properties
    const updatedUser = PartialUserModel.parse({id, firstname, lastname, email});

    // If the password is provided, update the password
    if (rawPassword) {
      // Hashes the password so that it is not stored in plain text
      const hashedPassword = await hash(rawPassword);

      // Validates the password
      const password = UserModel.shape.password.parse(hashedPassword);

      // Updates the user password
      await updateUserPassword(id, password);
    }  

    // Updates the user
    const newUser = await updateUser(updatedUser);

    // Returns the updated user
    return res.status(200).json(newUser);
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default UserHandler;