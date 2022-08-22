import { NextApiRequest, NextApiResponse } from 'next';

interface CookieType {
  userId: string
}

export interface ApiProps {
  res: NextApiResponse;
  req: NextApiRequest;
}

export default CookieType;