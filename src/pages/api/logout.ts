import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const id_token_hint = req.query.id_token_hint;

  const path = `${
    process.env.KEYCLOAK_URL
  }/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
    process.env.NEXTAUTH_URL || ""
  )}&id_token_hint=${id_token_hint}`;

  res.redirect(path);
};

export default logout;
