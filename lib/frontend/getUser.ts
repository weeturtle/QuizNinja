import { GetServerSidePropsContext } from 'next';
import { getUserById } from '../../prisma/user';
import { PartialUserModel } from '../../prisma/zod';
import decodeToken from './decodeToken';
import getToken from './getToken';

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
  const { req } = context;

  // Extracts the cookie from the request
  const token = getToken(req);

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

  // Decodes the token and gets the user id from it
  const data = decodeToken(token);

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
