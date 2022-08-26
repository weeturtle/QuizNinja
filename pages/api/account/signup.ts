import { NextApiHandler } from 'next';
import Signup from '../../../lib/server/Auth/signup';

// Handles API requests made to /api/account/signup
const SignupHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'POST': {
    // Handles the sign up request
    return await Signup(req, res);
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default SignupHandler;