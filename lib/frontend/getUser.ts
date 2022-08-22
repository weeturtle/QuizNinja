import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { getUserById } from '../../prisma/user';
import { PartialUserModel } from '../../prisma/zod';
import CookieType from '../../types/cookieType';

interface GetUserResponse {
  props: {
    user?: PartialUserModel;
  }
  redirect?: {
    destination: string;
    permanent: boolean;
  }
}

const getUser = async (context: GetServerSidePropsContext): Promise<GetUserResponse> => {
  const { res, req } = context;
  const token = getCookie('token', { req, res }) as string;

  console.table(token);

  if (!token) {
    return {
      redirect: {
        destination: '/accounts/login',
        permanent: false,
      },
      props: {}
    };
  }

  const secretToken = process.env.JWT_SECRET || 'secret';
  const data = jwt.verify(token, secretToken) as CookieType;

  const user = await getUserById(data.userId);

  return {
    props: {
      user: PartialUserModel.parse(user)
    },
  };
};

export default getUser;