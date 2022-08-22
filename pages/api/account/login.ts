import { NextApiHandler } from 'next';
import Signin from '../../../lib/server/Auth/signin';

const SigninHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
  case 'POST': {
    return await Signin(req, res);
  }
  default:
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default SigninHandler;