import { NextPage } from 'next';
import Login from '../../components/Account/Login';

const LoginPage: NextPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <Login />
    </div>
  );
};

export default LoginPage;