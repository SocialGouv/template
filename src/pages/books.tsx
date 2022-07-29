/* eslint-disable jsx-a11y/click-events-have-key-events  */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@dataesr/react-dsfr";
import { fetchHasura, HasuraJsonResponse } from "src/lib/hasura";

const fetchQuery = `
query MyQuery {
  books(order_by: {name: asc}) {
    id
    name
  }
}
`;

const insertQuery = `
mutation MyMutation($name: String!) {
  insert_books_one(object: {name: $name}) {
    id
    name
    user_id
  }
}
`;

const deleteQuery = `
mutation MyMutation($id: uuid!) {
  delete_books_by_pk(id: $id) {
    id
    name
    user_id
  }
}
`;

type Book = { id: string; name: string; user_id: string };

const BooksPage = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  const [addText, setAddText] = useState("");

  const token = {
    accessToken: session?.accessToken || "",
    refreshToken: session?.refreshToken || "",
    accessTokenExpires: session?.accessTokenExpires || 0,
  };
  const fetchBooks = useCallback(() => {
    fetchHasura(
      {
        query: fetchQuery,
      },
      token
    )
      .then((r) => {
        setBooks(r.data.books);
      })
      .catch((e) => console.error("ERROR", e));
  }, [session]);

  useEffect(() => {
    if (!books.length) {
      fetchBooks();
    }
  }, [books, fetchBooks, session]);

  const onInputAddChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setAddText(text);
  };

  const addBook = (e: MouseEvent) => {
    console.log("addBook", e, addText);
    if (addText) {
      fetchHasura(
        {
          query: insertQuery,
          variables: {
            name: addText,
          },
        },
        token
      )
        .then((r: HasuraJsonResponse) => {
          if (r && r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
          }
          setAddText("");
          fetchBooks();
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  const deleteBook = (id: string) => {
    console.log("deleteBook", id);
    fetchHasura(
      {
        query: deleteQuery,
        variables: {
          id,
        },
      },
      token
    )
      .then((r: HasuraJsonResponse) => {
        if (r && r.errors && r.errors.length) {
          throw new Error(r.errors[0].message);
        }
        if (!r.data.delete_books_by_pk) {
          throw new Error("Cannot delete book");
        }
        fetchBooks();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className="fr-container fr-my-6w">
      <h1>Books ({books.length})</h1>
      {/* @ts-ignore */}
      <input
        type="text"
        className="fr-input"
        /* @ts-ignore */
        onChange={onInputAddChange}
        value={addText}
        style={{ width: 300, display: "inline" }}
      ></input>
      <Button onClick={addBook}>Add book</Button>
      <div className="fr-px-3w">
        <ul>
          {books.map((book: Book) => (
            <li key={book.id}>
              {/* @ts-ignore */}
              {session && (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteBook(book.id)}
                >
                  X
                </span>
              )}{" "}
              {book.name}
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={fetchBooks}>reload list</Button>
    </div>
  );
};

export default BooksPage;
