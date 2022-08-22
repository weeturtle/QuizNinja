import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { getUserById } from '../../prisma/user';
import { PartialUserModel } from '../../prisma/zod';
import CookieType from '../../types/cookieType';

// Defines the type of the response from the getUser function
// Either redirects the user to the login page or returns the user
interface GetUserResponse {
  props: {
    user?: PartialUserModel;
  }
  redirect?: {
    destination: string;
    permanent: boolean;
  }
}

// Function called by the getServerSideProps function
// Is called when the page renders
// Returns the user and the redirect destination if the user is not logged in
const getUser = async (context: GetServerSidePropsContext): Promise<GetUserResponse> => {
  // Extracts the response and request from the context
  const { res, req } = context;

  // Extracts the cookie from the request
  const token = getCookie('token', { req, res }) as string;

  // If the token is not present, redirect the user to the login page
  if (!token) {
    return {
      redirect: {
        destination: '/accounts/login',
        permanent: false,
      },
      props: {}
    };
  }

  // Decodes the token and extracts the user id
  const secretToken = process.env.JWT_SECRET || 'secret';
  const data = jwt.verify(token, secretToken) as CookieType;

  // Gets the user from the database
  const user = await getUserById(data.userId);

  // Returns the user component
  return {
    props: {
      user: PartialUserModel.parse(user)
    },
  };
};

export default getUser;
