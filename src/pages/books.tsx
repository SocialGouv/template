/* eslint-disable jsx-a11y/click-events-have-key-events  */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { HasuraJsonResponse } from "../lib/hasura";

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
      //@ts-ignore
      accessToken: session?.accessToken || "",
      //@ts-ignore
      refreshToken: session?.refreshToken || "",
      //@ts-ignore
      accessTokenExpires: session?.accessTokenExpires || 0,
    }),
    [session]
  );

  const reloadBooks = useCallback(() => {
    fetchBooks(token)
      .then((r: any) => {
        setBooks(r.data.books);
      })
      .catch((e: Error) => console.error("ERROR", e));
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

  const addBook: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (addText) {
      insertBook(token, {
        name: addText,
      })
        .then(() => {
          setAddText("");
          reloadBooks();
        })
        .catch((e: Error) => {
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
      .catch((e: Error) => {
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
      <Button onClick={reloadBooks}>reload list</Button>
    </div>
  );
};

export default BooksPage;
