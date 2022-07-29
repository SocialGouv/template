import React, { useEffect, useState } from "react";
import { withAuth } from "@lib";
import { signIn, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

import { refreshAccessToken } from "../lib/auth";

const HASURA_GRAPHQL_ENDPOINT_URL = "http://localhost:8082/v1/graphql";

const fetchQuery = `
query MyQuery {
  books(order_by: {name: asc}) {
    id
    name
  }
}
`;

type Book = { id: string; name: string };

const BooksPage = ({ accessToken }: { accessToken: string }) => {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  console.log("session", session);

  //   useEffect(() => {
  //     if (session?.error === "RefreshAccessTokenError") {
  //       signIn(); // Force sign in to hopefully resolve error
  //     }
  //   }, [session]);

  console.log("books", books);
  const fetchBooks = () => {
    if (session && session.accessToken) {
      fetch(HASURA_GRAPHQL_ENDPOINT_URL, {
        method: "POST",
        body: JSON.stringify({
          operationName: "MyQuery",
          query: fetchQuery,
          variables: {},
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.errors) {
            r.errors.forEach((e: Error) => console.error(e));
            if (
              r.errors
                .map((r: any) => r.message)
                .filter((m: string) => m.match(/JWTExpired/)).length
            ) {
              // refresh JWT
              console.log("should refresh");
            }
          } else {
            setBooks(r.data.books);
          }
        })
        .catch((e) => console.error("ERROR", e));
    }
  };
  useEffect(() => {
    console.log("fetch");
    if (session && session.accessToken) {
      fetchBooks();
    }
  }, [session]);
  return (
    <div className="fr-container fr-my-6w">
      <h1>Books ({books.length})</h1>
      <button onClick={fetchBooks}>reload</button>
      <div className="fr-px-3w">
        <ul>
          {books.map((book: Book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  //@ts-ignore
  const token = (context.req && (await getToken({ req: context.req }))) || null;
  console.log(token);
  return {
    props: {
      // accessToken: token.accessToken,
    },
  };
});

export default BooksPage;
