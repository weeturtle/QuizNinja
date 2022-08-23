import { NextApiHandler } from 'next';
import Signup from '../../../lib/server/Auth/signup';

const SignupHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'POST': {
    return await Signup(req, res);
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default SignupHandler;