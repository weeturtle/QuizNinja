import { NextApiHandler } from 'next';
import { getUserByEmail } from '../../../prisma/user';
import { UserModel } from '../../../prisma/zod';
import { verify } from 'argon2';
import setCookies from './setCookies';

// Function called when a POST request is made to the /signin endpoint
const Signin: NextApiHandler = async (req, res) => {
  // Extracts the email and password from the request body
  const {
    email: rawEmail,
    password: rawPassword,
  } = req.body;

  // Validates the email and password
  // If the email or password is not valid, return an error
  const email = UserModel.shape.email.parse(rawEmail);
  const password = UserModel.shape.password.parse(rawPassword);

  // Fetches the user from the database by email
  const user = await getUserByEmail(email);

  // If no user is found, return an error
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Checks the password against the password hash in the database
  // If the password is incorrect, return an error
  if (!(await verify(user.password, password))) {
    return res.status(422).json({ message: 'Wrong email or password' });
  }

  // Otherwise, set the cookies and return the user
  setCookies(user, req, res);

  // Returns the user object to the client
  return res.status(200).json(user);

};

export default Signin;