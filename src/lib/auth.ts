import { NextPageContext } from "next";
import cookie from "cookie";

export function withAuth(
  getServerSideProps: (context: NextPageContext) => any
) {
  return async (context: NextPageContext) => {
    const parsedCookie = cookie.parse(context.req?.headers.cookie || "");
    if (!parsedCookie.isAuthenticated) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
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
