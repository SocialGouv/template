// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const token = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (token) {
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
    res.json(token);
  } else {
    res.status(401);
  }
  res.end();
};

export default token;
