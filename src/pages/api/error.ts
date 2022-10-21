// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";

const triggerError = async (req: NextApiRequest, res: NextApiResponse) => {
  throw new Error("Server error :/");
};

export default withSentry(triggerError);
