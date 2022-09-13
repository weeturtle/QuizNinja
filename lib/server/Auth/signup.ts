import { NextApiHandler } from 'next';
import { addUser } from '../../../prisma/user';
import { NewUserModel } from '../../../prisma/zod';
import hash from './hash';
import setCookies from './setCookies';

// Function called when a POST request is made to the /signup endpoint
const Signup: NextApiHandler = async (req, res) => {
  // Extracts the user information from the request body
  const {
    firstname: rawFirstName,
    lastname: rawLastName,
    email: rawEmail,
    password: rawPassword,
  } = req.body;

  // Hashes the password so that it is not stored in plain text
  const hashedPassword = await hash(rawPassword);

  // Validates the user information 
  // Transforms the user information into a user model
  const userParse = NewUserModel.safeParse({
    firstname: rawFirstName,
    lastname: rawLastName,
    email: rawEmail,
    password: hashedPassword,
  });

  // If the user information is not valid, return an error
  if (!userParse.success) {
    return res.status(422).json({ error: userParse.error });
  }

  // Adds the user to the database
  const user = await addUser(userParse.data);

  // If the user already exists with that email, return an error
  if (!user) {
    return res.status(422).json({ message: 'User already exists' });
  }

  // Sets the cookies for the user
  // This signs them in automatically
  setCookies(user, req, res);

  // Returns the user to the client 
  return res.status(200).json(user);
};

export default Signup;