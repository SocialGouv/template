import React, { useCallback, useEffect, useState } from "react";
import { withAuth } from "@lib";
import { useSession } from "next-auth/react";

import { fetchHasura } from "src/lib/hasura";

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

  const fetchBooks = useCallback(() => {
    if (session && session.accessToken) {
      fetchHasura(
        {
          operationName: "MyQuery",
          query: fetchQuery,
          variables: {},
        },
        {
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          accessTokenExpires: session.accessTokenExpires,
        }
      )
        .then((r) => {
          setBooks(r.data.books);
        })

        .catch((e) => console.error("ERROR", e));
    }
  }, [session]);
  useEffect(() => {
    if (!books.length && session && session.accessToken) {
      fetchBooks();
    }
  }, [books, fetchBooks, session]);
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
  return {
    props: {},
  };
});

export default BooksPage;
