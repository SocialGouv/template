// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

import { refreshAccessToken } from "../../lib/auth";

const token = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const newToken = await refreshAccessToken(token);
  //const session = await getSession({ req });
  if (token) {
    console.log("JSON Web Token", JSON.stringify(newToken, null, 2));
    //console.log(session);
    res.json({ token });
  } else {
    res.status(401);
  }
  res.end();
};

export default token;
