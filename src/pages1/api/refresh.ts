// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { refreshAccessToken } from "../../lib/auth";

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const newToken = await refreshAccessToken(token);
  if (newToken) {
    res.json(newToken);
  } else {
    res.status(401);
  }
  res.end();
};

export default refresh;
