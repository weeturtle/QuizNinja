import { FC, useState } from 'react';
import AccountInput from '../AccountInput';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <AccountInput placeholder='Email' type='email' text={email} setText={setEmail} />
      <AccountInput placeholder='Password' type='password' text={password} setText={setPassword} />
    </>
  );
};

export default Login;