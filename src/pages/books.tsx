/* eslint-disable jsx-a11y/click-events-have-key-events  */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { Button } from "@dataesr/react-dsfr";
import { HasuraJsonResponse } from "src/lib/hasura";

import {
  fetch as fetchBooks,
  insert as insertBook,
  delete_py_pk as deleteBookByPk,
} from "../services/books";

type Book = { id: string; name: string; user_id: string };

const BooksPage = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState<any[] | null>(null);
  const [addText, setAddText] = useState("");

  const token = useMemo(
    () => ({
      accessToken: session?.accessToken || "",
      refreshToken: session?.refreshToken || "",
      accessTokenExpires: session?.accessTokenExpires || 0,
    }),
    [session]
  );

  const reloadBooks = useCallback(() => {
    fetchBooks(token)
      .then((r) => {
        setBooks(r.data.books);
      })
      .catch((e) => console.error("ERROR", e));
  }, [token]);

  useEffect(() => {
    if (!books) {
      reloadBooks();
    }
  }, [books, reloadBooks, session]);

  const onInputAddChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setAddText(text);
  };

  const addBook = (e: MouseEvent) => {
    if (addText) {
      insertBook(token, {
        name: addText,
      })
        .then(() => {
          setAddText("");
          reloadBooks();
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  const deleteBook = (id: string) => {
    deleteBookByPk(token, {
      id,
    })
      .then((r: HasuraJsonResponse) => {
        if (!r.data.delete_books_by_pk) {
          throw new Error("Cannot delete book");
        }
        reloadBooks();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className="fr-container fr-my-6w">
      <h1>Books ({(books && books.length) || 0})</h1>
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
          {books &&
            books.map((book: Book) => (
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
