import { NextApiRequest, NextApiResponse } from "next";

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * TODO: https://www.keycloak.org/2022/04/keycloak-1800-released.html
   *
   * add `post_logout_redirect_uri` and `id_token_hint` to logout transparently with KeyCloak
   *
   */
  const path = `${
    process.env.KEYCLOAK_URL
  }/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(
    process.env.NEXTAUTH_URL || ""
  )}`;

  res.redirect(path);
};

export default logout;
