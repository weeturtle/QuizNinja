import { NextApiHandler } from 'next';
import Signin from '../../../lib/server/Auth/signin';

// Handles API requests made to /api/account/login
const SigninHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'POST': {
    // Handles the sign in request
    return await Signin(req, res);
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default SigninHandler;