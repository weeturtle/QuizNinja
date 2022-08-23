import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// Configures the cookies and creates a token for the user
const setCookies = (user: User, req: NextApiRequest, res: NextApiResponse) => {
  // Extracts the secret token from the environment variables
  const secretToken = process.env.JWT_SECRET;

  // If the secret token is not present, throw an error
  if (!secretToken) {
    return res.status(500).json({ message: 'JWT_SECRET is not defined' });
  }

  // Creates the token containing the user id
  // The token is valid for 1 day
  const token = jwt.sign({
    userId: user.id,
  }, secretToken, {
    expiresIn: '1d',
  });

  // Sets the cookies containing the token
  res.setHeader('cookies', `token=${token}`);
};

export default setCookies;