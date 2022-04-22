import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export function withAuth(
  getServerSideProps: (context: NextPageContext) => any
) {
  return async (context: NextPageContext) => {
    const session = await getSession({ req: context.req });
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/api/auth/signin",
        },
      };
    }
    const getServerSidePropsData = await getServerSideProps(context);
    return {
      props: {
        ...getServerSidePropsData.props,
      },
    };
  };
}
